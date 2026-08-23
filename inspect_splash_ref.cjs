const fs = require('fs');
const PNG = require('pngjs').PNG;

const refPath = `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\3f431345-2077-4afb-803a-9203352a4a15\\.user_uploaded\\media_1786702479366.png`;
const destRef = `C:\\Users\\Admin\\.gemini\\antigravity\\scratch\\fixkar-web\\public\\splash-reference.png`;

fs.copyFileSync(refPath, destRef);

fs.createReadStream(destRef)
  .pipe(new PNG())
  .on('parsed', function() {
    console.log(`Reference Image Dimensions: ${this.width} x ${this.height}`);
  });
