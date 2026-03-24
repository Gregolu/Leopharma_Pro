const fs = require('fs');

const htmlPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.html';
let lines = fs.readFileSync(htmlPath, 'utf8').split('\n');

// 1. Remove duplicate ts function
const tsPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.ts';
let tsContent = fs.readFileSync(tsPath, 'utf8');

let tsLines = tsContent.split('\n');
let newTsLines = [];
let skip = false;
for (let i = 0; i < tsLines.length; i++) {
  if (tsLines[i].includes('showHistory(q: any) {') && i > 180) { // The second one
    skip = true;
  }
  if (!skip) {
    newTsLines.push(tsLines[i]);
  }
  if (skip && tsLines[i].includes('  }')) { // crude skip
    skip = false;
  }
}
fs.writeFileSync(tsPath, newTsLines.join('\n'));
console.log('Fixed TS.');

// 2. Fix HTML lines
// Lines are 0-indexed in JS
if (lines[65].trim() === '</div>') {
    lines.splice(65, 1);
} else if (lines[66].trim() === '</div>') {
    lines.splice(66, 1);
}

// Find last </div> and remove it
for (let i = lines.length - 1; i >= 0; i--) {
   if (lines[i].trim() === '</div>') {
      lines.splice(i, 1);
      break;
   }
}

fs.writeFileSync(htmlPath, lines.join('\n'));
console.log('Fixed HTML.');
