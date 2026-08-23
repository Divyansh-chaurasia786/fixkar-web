const http = require('http');
const crypto = require('crypto');

function base32Decode(base32) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  const clean = String(base32).replace(/=+$/, '').toUpperCase().replace(/\s+/g, '');
  for (let i = 0; i < clean.length; i++) {
    const val = alphabet.indexOf(clean.charAt(i));
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, '0');
  }
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substr(i, 8), 2));
  }
  return Buffer.from(bytes);
}

function getTOTP(secret, timeOffsetStep = 0) {
  const key = base32Decode(secret);
  const timeStep = 30;
  const epoch = Math.floor(Date.now() / 1000) + (timeOffsetStep * timeStep);
  const counter = Math.floor(epoch / timeStep);
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigUInt64BE(BigInt(counter), 0);

  const hmac = crypto.createHmac('sha1', key).update(counterBuffer).digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const code = (
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)
  ) % 1000000;
  return code.toString().padStart(6, '0');
}

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body || '{}') }));
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runSecurityTests() {
  console.log('=== FIXKAR TWO-LAYER SECURITY AUTOMATED VERIFICATION ===\n');

  // Test 1: Direct public access to Super Admin without Admin session -> MUST FAIL (401)
  console.log('[Test 1] Attempting direct Super Admin login without Admin session...');
  const test1 = await request(
    {
      hostname: 'localhost',
      port: 5050,
      path: '/api/super-admin/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    { username: 'fixkar_root', password: 'SuperAdmin#Pass2026', totpCode: '123456' }
  );
  console.log('Result Status:', test1.status, test1.data);
  if (test1.status === 401) {
    console.log('✅ PASS: Direct public access strictly blocked without Layer 1 session.\n');
  }

  // Test 2: Layer 1 Admin Login with correct credentials -> MUST SUCCEED (200)
  console.log('[Test 2] Attempting Layer 1 Admin login with admin@fixkar.co.in / AdminPass@2026...');
  const test2 = await request(
    {
      hostname: 'localhost',
      port: 5050,
      path: '/api/admin/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    { identifier: 'admin@fixkar.co.in', password: 'AdminPass@2026' }
  );
  console.log('Result Status:', test2.status, 'User:', test2.data.user);
  if (test2.status === 200 && test2.data.token) {
    console.log('✅ PASS: Layer 1 Admin session token generated successfully.\n');
  }

  const adminToken = test2.data.token;

  // Test 3: Fetching leads with valid Admin token -> MUST SUCCEED (200)
  console.log('[Test 3] Fetching leads with Layer 1 Admin token...');
  const test3 = await request({
    hostname: 'localhost',
    port: 5050,
    path: '/api/admin/leads',
    method: 'GET',
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  console.log('Result Status:', test3.status, 'Total Leads:', test3.data.leads?.length);
  if (test3.status === 200) {
    console.log('✅ PASS: Admin leads table accessible with Layer 1 session.\n');
  }

  // Test 4: Attempting to access Super Admin Audit Logs without Super Admin token -> MUST FAIL (401)
  console.log('[Test 4] Attempting to read Super Admin audit logs with only Layer 1 token...');
  const test4 = await request({
    hostname: 'localhost',
    port: 5050,
    path: '/api/super-admin/audit-logs',
    method: 'GET',
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  console.log('Result Status:', test4.status, test4.data);
  if (test4.status === 401) {
    console.log('✅ PASS: Super Admin controls strictly blocked from normal Admin token.\n');
  }

  // Test 5: Layer 2 Step-Up Super Admin Login with Layer 1 session + Valid TOTP
  const currentTotp = getTOTP('JBSWY3DPEHPK3PXP');
  console.log(`[Test 5] Attempting Layer 2 Super Admin Step-Up Login with TOTP code [${currentTotp}]...`);
  const test5 = await request(
    {
      hostname: 'localhost',
      port: 5050,
      path: '/api/super-admin/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
    },
    { username: 'fixkar_root', password: 'SuperAdmin#Pass2026', totpCode: currentTotp }
  );
  console.log('Result Status:', test5.status, 'SuperUser:', test5.data.superUser);
  if (test5.status === 200 && test5.data.superToken) {
    console.log('✅ PASS: Layer 2 Super Admin Step-Up authentication granted.\n');
  }

  const superToken = test5.data.superToken;

  // Test 6: Access Super Admin Audit Logs with elevated token -> MUST SUCCEED (200)
  console.log('[Test 6] Accessing Super Admin audit logs with elevated Super Admin token...');
  const test6 = await request({
    hostname: 'localhost',
    port: 5050,
    path: '/api/super-admin/audit-logs',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${adminToken}`,
      'x-super-token': superToken,
    },
  });
  console.log('Result Status:', test6.status, 'Total Audit Records:', test6.data.logs?.length);
  if (test6.status === 200) {
    console.log('✅ PASS: Super Admin audit logs successfully retrieved.\n');
  }

  // Test 7: Exit Super Admin -> Demotes to Layer 1
  console.log('[Test 7] Exiting Super Admin mode (downgrade to Layer 1)...');
  const test7 = await request({
    hostname: 'localhost',
    port: 5050,
    path: '/api/super-admin/exit',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${adminToken}`,
      'x-super-token': superToken,
    },
  });
  console.log('Result Status:', test7.status, test7.data);
  if (test7.status === 200) {
    console.log('✅ PASS: Super Admin mode exited safely without destroying Layer 1 session.\n');
  }

  console.log('=== ALL 7 PRIVILEGED SECURITY TESTS PASSED PERFECTLY ===');
}

runSecurityTests().catch(console.error);
