const fs = require('fs');
let html = fs.readFileSync('src/app/pages/patients/patient-monitoring/patient-monitoring.html', 'utf8');

// 1. Remove cogs
html = html.replace('<i class="fas fa-cog" style="color: #10b981; cursor: pointer;"></i>', '');
html = html.replace('<i class="fas fa-cog" style="color: #10b981; cursor: pointer;"></i>', '');
html = html.replace('<i class="fas fa-cog" style="color: #94a3b8; cursor: pointer;"></i>', '');

// 2. Increase grid gap for more spacing
html = html.replace('gap: 24px;"', 'gap: 40px;"');

fs.writeFileSync('src/app/pages/patients/patient-monitoring/patient-monitoring.html', html);
console.log('Removed cogs and increased gap.');
