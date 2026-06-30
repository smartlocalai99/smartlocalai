function encode(svg) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const BUILDERS = {
  // spreadsheet / ledger cells — SmartBooks, SmartIndustry
  grid: (color, size) => encode(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><path d="M${size} 0H0V${size}" fill="none" stroke="${color}" stroke-opacity="0.16"/></svg>`
  ),
  // ruled notebook paper — SmartSchool
  lines: (color, size) => encode(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><line x1="0" y1="${size}" x2="${size}" y2="${size}" stroke="${color}" stroke-opacity="0.2"/></svg>`
  ),
  // courthouse fluted columns — SmartLawyer
  columns: (color, size) => encode(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><line x1="${size}" y1="0" x2="${size}" y2="${size}" stroke="${color}" stroke-opacity="0.2"/></svg>`
  ),
  // scan / chip texture — SmartAttendance, SmartHospital, SmartPayments
  dots: (color, size) => encode(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="1.6" fill="${color}" fill-opacity="0.3"/></svg>`
  ),
  // motion lines — SmartGym
  stripes: (color, size) => encode(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><line x1="0" y1="${size}" x2="${size}" y2="0" stroke="${color}" stroke-opacity="0.18" stroke-width="2"/></svg>`
  ),
  // concentric rings (plate / fingerprint scan) — SmartRestaurant
  rings: (color, size) => encode(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${[0.28, 0.52, 0.76]
      .map((r) => `<circle cx="${size}" cy="0" r="${size * r}" fill="none" stroke="${color}" stroke-opacity="${0.22 - r * 0.12}"/>`)
      .join("")}</svg>`
  ),
};

// audio waveform bars — SmartVoice (non-tiling, full-width hero motif)
export function waveTexture(color, bars = [10, 22,15, 30, 18, 26, 12, 24, 16, 28, 11, 20]) {
  const w = bars.length * 14;
  const h = 36;
  const rects = bars
    .map((bh, i) => `<rect x="${i * 14 + 3}" y="${h - bh}" width="5" height="${bh}" rx="2.5" fill="${color}" fill-opacity="0.28"/>`)
    .join("");
  return encode(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${rects}</svg>`);
}

export function cardTexture(kind, color, size = 22) {
  const build = BUILDERS[kind] || BUILDERS.grid;
  return { backgroundImage: build(color, size), backgroundSize: `${size}px ${size}px` };
}
