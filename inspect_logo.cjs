const fs = require('fs');
const PNG = require('pngjs').PNG;

const inputPath = `C:\\Users\\Admin\\Downloads\\fixkar.png`;

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    console.log(`Original file dimensions: ${this.width}x${this.height}`);
    let transparentPixels = 0;
    let opaquePixels = 0;

    for (let i = 0; i < this.data.length; i += 4) {
      if (this.data[i + 3] < 255) {
        transparentPixels++;
      } else {
        opaquePixels++;
      }
    }

    console.log(`Transparent pixels: ${transparentPixels}, Opaque pixels: ${opaquePixels}`);
    console.log(`Has transparency: ${transparentPixels > 0}`);
  });
