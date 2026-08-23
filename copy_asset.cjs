const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b08be05d-25f1-47c7-9fdb-5efb2eedc430\\hero_developer_workstation_1786888337371.jpg';
const dest = path.join(__dirname, 'public', 'hero-workstation.jpg');

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Successfully copied hero workstation image to public/hero-workstation.jpg');
  } else {
    console.log('Source file does not exist:', src);
  }
} catch (err) {
  console.error('Error copying file:', err);
}
