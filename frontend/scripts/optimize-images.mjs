import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "src/assets/images");

const customerPhotos = [
  "customer_asian_woman.png",
  "customer_father_daughter.png",
  "customer_group_friends.png",
  "customer_older_man.png",
  "customer_senior_couple.png",
  "customer_woman_phone.png",
  "customer_young_man.png",
];

const sectionImages = [
  "life_insurance_section.png",
  "health_insurance_section.png",
  "motor_insurance_section.png",
];

async function run() {
  // Small decorative marks — downscale in place, no code changes needed.
  await sharp(path.join(dir, "logo.png"))
    .resize(96, 96)
    .png({ quality: 85 })
    .toFile(path.join(dir, "logo.tmp.png"));
  fs.renameSync(path.join(dir, "logo.tmp.png"), path.join(dir, "logo.png"));

  await sharp(path.join(dir, "favicon.png"))
    .resize(64, 64)
    .png({ quality: 85 })
    .toFile(path.join(dir, "favicon.tmp.png"));
  fs.renameSync(path.join(dir, "favicon.tmp.png"), path.join(dir, "favicon.png"));

  // Customer photos — displayed at ~120-260px in the photo grid. 320w covers retina.
  for (const file of customerPhotos) {
    const name = file.replace(/\.png$/, "");
    await sharp(path.join(dir, file))
      .resize(320)
      .webp({ quality: 78 })
      .toFile(path.join(dir, `${name}.webp`));
  }

  // Section images — displayed at ~500-560px. 640w / 1280w covers 1x / 2x.
  for (const file of sectionImages) {
    const name = file.replace(/\.png$/, "");
    await sharp(path.join(dir, file))
      .resize(640)
      .webp({ quality: 78 })
      .toFile(path.join(dir, `${name}.webp`));
    await sharp(path.join(dir, file))
      .resize(1280)
      .webp({ quality: 78 })
      .toFile(path.join(dir, `${name}@2x.webp`));
  }

  console.log("Done.");
}

run();
