const fs = require('fs');
const html = fs.readFileSync('src/app/pages/patients/patient-dossier/patient-dossier.component.html', 'utf8');

let depth = 0;
let tags = [];
const regex = /<\/?div[^>]*>/g;
let match;
let issues = [];

while ((match = regex.exec(html)) !== null) {
  const line = html.substring(0, match.index).split('\n').length;
  if (!match[0].startsWith('</')) {
    depth++;
    tags.push({line, tag: match[0], d: depth});
  } else {
    depth--;
    tags.pop();
    if (depth < 0) {
      issues.push(`Closing div at line ${line} has no opener.`);
      depth = 0;
    }
  }
}

if (depth > 0) {
  issues.push(`${depth} unclosed divs at end.`);
  for (let t of tags) {
    issues.push(`Unclosed: ${t.line} - ${t.tag}`);
  }
}
console.log('Issues:', issues.length ? issues : 'Perfect match!');
