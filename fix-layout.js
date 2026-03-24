const fs = require('fs');

const htmlPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// The problematic legend duplicate chunk blocks:
// From line 32 to 66 approximately. 
// We will replace the entire sidebar-legend div and whatever is after it up to the main-content with clean code.
const regexLegendReplace = /<!-- Légende -->[\s\S]*?<!-- COLONNE DROITE: Contenu principal -->/;
const cleanLegend = `<!-- Légende -->
      <div class="sidebar-legend" style="margin: 12px; margin-top: auto; padding: 10px; font-size: 0.75rem;">
        <h4 class="legend-title" style="font-size: 0.85rem; margin-bottom: 4px; margin-top: 0;">Légende</h4>
        <div class="legend-row" style="margin-bottom: 2px;">
          <div class="status-dot success" style="width:8px;height:8px;background:#10b981;border-radius:50%;"></div> <span>Complété</span>
        </div>
        <div class="legend-row" style="margin-bottom: 2px;">
          <div class="status-dot error" style="width:8px;height:8px;background:#ef4444;border-radius:50%;"></div> <span>Non complété</span>
        </div>
        <div class="legend-row mt-2" style="margin-top: 6px; margin-bottom: 2px;">
          <i class="fas fa-user-injured legend-icon" style="width:16px;text-align:center;"></i> <span>Patient</span>
        </div>
        <div class="legend-row" style="margin-bottom: 2px;">
          <i class="fas fa-stethoscope legend-icon" style="width:16px;text-align:center;"></i> <span>Pro</span>
        </div>
        <div class="legend-row" style="margin-bottom: 2px;">
          <i class="fas fa-hands-helping legend-icon" style="width:16px;text-align:center;"></i> <span>Patient + pro</span>
        </div>
      </div>
    </div> <!-- FIN sidebar-left -->

    <!-- COLONNE DROITE: Contenu principal -->`;

html = html.replace(regexLegendReplace, cleanLegend);

// Remove the download button from dossier
const regexDownload = /<div class="btn-download-zone"[^>]*>[\s\S]*?Télécharger le dossier patient<\/strong>\s*<\/div>/g;
html = html.replace(regexDownload, '');

// Save
fs.writeFileSync(htmlPath, html);
console.log('Fixed patient dossier layout and removed download btn.');
