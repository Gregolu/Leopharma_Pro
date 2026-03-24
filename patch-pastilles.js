const fs = require('fs');

const globalCssPath = 'src/styles.scss';
let globalCss = fs.readFileSync(globalCssPath, 'utf8');

if (!globalCss.includes('.color-pastille')) {
  globalCss += `\n/* GLOBAL PASTILLES FOR STUDIES AND FOLLOW-UPS */
.color-pastille {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
    flex-shrink: 0;
}
.pastille-severe { background-color: #ec4899; } /* Pink */
.pastille-modere { background-color: #3b82f6; } /* Blue */
.pastille-trial-a { background-color: #10b981; } /* Green */
.pastille-beta { background-color: #f59e0b; } /* Orange */
`;
  fs.writeFileSync(globalCssPath, globalCss);
}

// 1. patient-detail.component.html
const pDetailStr = 'src/app/pages/patients/patient-detail/patient-detail.component.html';
let pdHtml = fs.readFileSync(pDetailStr, 'utf8');
pdHtml = pdHtml.replace(
  /<div class="lr-vignette color-pink"><\/div>\s*<span class="lr-name">EczemaCare Trial A<\/span>/g,
  '<div class="color-pastille pastille-trial-a"></div>\n                  <span class="lr-name">EczemaCare Trial A</span>'
);
pdHtml = pdHtml.replace(
  /<span class="ep-value severe">Sévère<\/span>/g,
  '<div style="display:flex; align-items:center;"><div class="color-pastille pastille-severe"></div> <span class="ep-value severe" style="background:transparent; color:#ec4899; padding:0; border:none;">Eczéma sévère</span></div>'
);
// Replace marker in abstract gauge
pdHtml = pdHtml.replace(
  /<div class="marker" style="left: 85%;">\s*<span>Sévère<\/span>\s*<\/div>/g,
  '<div class="marker" style="left: 85%;"><div class="color-pastille pastille-severe" style="width:8px; height:8px; margin-right:4px;"></div><span>Sévère</span></div>'
);
fs.writeFileSync(pDetailStr, pdHtml);

// 2. patient-protocol.component.html
const pProtStr = 'src/app/pages/patients/patient-protocol/patient-protocol.component.html';
if (fs.existsSync(pProtStr)) {
  let ppHtml = fs.readFileSync(pProtStr, 'utf8');
  ppHtml = ppHtml.replace(
    /<span class="active-badge">Eczéma sévère<\/span>/g,
    '<span class="active-badge" style="display:inline-flex; align-items:center;"><div class="color-pastille pastille-severe" style="margin-right:6px;"></div>Eczéma sévère</span>'
  );
  ppHtml = ppHtml.replace(
    /<span class="active-badge">EczemaLife<\/span>/g,
    '<span class="active-badge" style="display:inline-flex; align-items:center;"><div class="color-pastille pastille-trial-a" style="margin-right:6px;"></div>EczemaLife</span>'
  );
  fs.writeFileSync(pProtStr, ppHtml);
}

console.log("Global Pastilles patched!");
