const fs = require('fs');
const file = 'src/app/pages/exportation/exportation.scss';
let text = fs.readFileSync(file, 'utf8');

// Replace standard green with #204131 (which is usually $primary)
text = text.replace(/#16a34a/g, '#204131');
text = text.replace(/#15803d/g, '#162d22'); // the hover state
text = text.replace(/#f1fdf4/g, 'rgba(32, 65, 49, 0.05)'); // double ring outer
text = text.replace(/#dcfce7/g, 'rgba(32, 65, 49, 0.15)'); // double ring inner
text = text.replace(/#f0fdf4/g, 'rgba(32, 65, 49, 0.05)'); // the light background hover

fs.writeFileSync(file, text);
console.log('Fixed export colors');
