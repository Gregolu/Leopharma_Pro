const fs = require('fs');
const path = 'src/styles.scss';
let scss = fs.readFileSync(path, 'utf8');

if (!scss.includes('.grid-row-nested')) {
    scss += `
.grid-row-nested {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}
@media (max-width: 900px) {
    .grid-row-nested {
        grid-template-columns: 1fr;
    }
}
.chart-card .pm-chart-wrapper {
   width: 100%;
   height: auto;
}
.monitoring-container {
   max-width: 100%;
}
`;
    fs.writeFileSync(path, scss);
}
console.log('SCSS Updated');
