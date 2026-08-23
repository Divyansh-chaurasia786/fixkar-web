const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Copy S Caterers Logo
const sCaterersLogo = 'C:\\Users\\Admin\\.gemini\\antigravity\\scratch\\s-caterers-events\\images\\logo.png';
if (fs.existsSync(sCaterersLogo)) {
  fs.copyFileSync(sCaterersLogo, path.join(publicDir, 'logo-scaterers.png'));
  console.log('Copied S Caterers logo to public/logo-scaterers.png');
}

// Copy Ecofone Logo
const ecofoneLogo = 'C:\\Users\\Admin\\.gemini\\antigravity\\scratch\\ecofone-frontend\\public\\logo.png';
if (fs.existsSync(ecofoneLogo)) {
  fs.copyFileSync(ecofoneLogo, path.join(publicDir, 'logo-ecofone.png'));
  console.log('Copied Ecofone logo to public/logo-ecofone.png');
}
