const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function hashPassword(password, salt) {
  return crypto.createHash('sha256').update(String(password) + String(salt)).digest('hex');
}

const adminPass = 'AdminPass@2026';
const adminSalt = 'fixkar_salt_2026';
const adminHash = hashPassword(adminPass, adminSalt);

const superPass = 'SuperAdmin#Pass2026';
const superSalt = 'fixkar_super_salt_2026';
const superHash = hashPassword(superPass, superSalt);

console.log('Admin Hash:', adminHash);
console.log('Super Hash:', superHash);

const authData = {
  admins: [
    {
      id: 'admin_01',
      name: 'Senior Lead Engineer',
      email: 'admin@fixkar.co.in',
      username: 'admin',
      passwordHash: adminHash,
      salt: adminSalt,
      role: 'admin',
      can_attempt_super_admin: true,
      status: 'active',
      createdAt: '2026-08-01T00:00:00.000Z'
    }
  ],
  superAdmins: [
    {
      id: 'super_01',
      username: 'fixkar_root',
      passwordHash: superHash,
      salt: superSalt,
      totpSecret: 'JBSWY3DPEHPK3PXP',
      totpSecretFormatted: 'JBSW Y3DP EHPK 3PXP',
      totpEnabled: true,
      recoveryCodesHashed: [
        'rec_hash_1a2b3c',
        'rec_hash_4d5e6f',
        'rec_hash_7g8h9i'
      ],
      status: 'active',
      createdAt: '2026-08-01T00:00:00.000Z'
    }
  ]
};

fs.writeFileSync(path.join(__dirname, 'data', 'auth_admins.json'), JSON.stringify(authData, null, 2), 'utf8');
console.log('Successfully written auth_admins.json with exact hashes!');
