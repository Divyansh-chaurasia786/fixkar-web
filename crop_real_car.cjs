const fs = require('fs');
const PNG = require('pngjs').PNG;

const refPath = `C:\\Users\\Admin\\.gemini\\antigravity\\scratch\\fixkar-web\\public\\splash-reference.png`;
const carOutPath = `C:\\Users\\Admin\\.gemini\\antigravity\\scratch\\fixkar-web\\public\\splash-real-car.png`;

fs.createReadStream(refPath)
  .pipe(new PNG())
  .on('parsed', function() {
    // Exact bounding box of the real sedan in 1024x682 reference image:
    // Car spans x: 130 to 435, y: 260 to 380
    const cropX = 130;
    const cropY = 260;
    const cropWidth = 305;
    const cropHeight = 120;

    const carPng = new PNG({ width: cropWidth, height: cropHeight });

    for (let y = 0; y < cropHeight; y++) {
      for (let x = 0; x < cropWidth; x++) {
        const srcX = cropX + x;
        const srcY = cropY + y;
        const srcIdx = (this.width * srcY + srcX) << 2;
        const destIdx = (cropWidth * y + x) << 2;

        const r = this.data[srcIdx];
        const g = this.data[srcIdx + 1];
        const b = this.data[srcIdx + 2];

        carPng.data[destIdx] = r;
        carPng.data[destIdx + 1] = g;
        carPng.data[destIdx + 2] = b;

        // Background removal algorithm preserving car body reflections and red taillight glow
        const maxVal = Math.max(r, g, b);
        
        // Dark background threshold
        if (maxVal < 14) {
          carPng.data[destIdx + 3] = 0;
        } else {
          // Feather edges smoothly for photorealistic transparent PNG
          const alpha = Math.min(255, Math.max(0, Math.floor((maxVal - 8) * 14)));
          carPng.data[destIdx + 3] = alpha;
        }
      }
    }

    carPng.pack().pipe(fs.createWriteStream(carOutPath)).on('finish', () => {
      console.log(`Photorealistic car layer saved to ${carOutPath}`);
    });
  });
