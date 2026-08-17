import QRCode from "qrcode";
import { mkdir, writeFile } from "node:fs/promises";

const url =
  process.env.QR_URL ||
  "https://ar-presentation-showcase.vercel.app";

const outputDirectory = "public/qr";

await mkdir(outputDirectory, {
  recursive: true,
});

const options = {
  errorCorrectionLevel: "H",
  margin: 2,
  color: {
    dark: "#000000",
    light: "#FFFFFF",
  },
};

await QRCode.toFile(
  `${outputDirectory}/nova-x1-presentation.png`,
  url,
  {
    ...options,
    width: 1024,
    type: "png",
  },
);

const svg = await QRCode.toString(
  url,
  {
    ...options,
    type: "svg",
  },
);

await writeFile(
  `${outputDirectory}/nova-x1-presentation.svg`,
  svg,
  "utf8",
);


console.log("QR generated successfully");
console.log(`Target: ${url}`);
console.log("PNG: public/qr/nova-x1-presentation.png");
console.log("SVG: public/qr/nova-x1-presentation.svg");
