const fs = require('fs');
const file = 'src/app/pages/analyse/analyse.ts';
let text = fs.readFileSync(file, 'utf8');

text = text.replace('style="height: 250px;"', 'style="height: 350px;"');
text = text.replace('height: 250px;', 'height: 350px;'); // specifically for .pie-chart-area
text = text.replace('height: 300px;', 'height: 350px;'); // specifically for .bar-chart-area

// "il y a inclusion actuelle et objectif d'inclusion qui est en dehors du bloc" implies the text needs more vertical space. We increased the container heights.

fs.writeFileSync(file, text);
console.log('Fixed analyse.ts');
