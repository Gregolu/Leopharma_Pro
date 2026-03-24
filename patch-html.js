const fs = require('fs');

const htmlPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// The popin HTML
const popinHTML = `
  <!-- History Modal -->
  <div class="modal-overlay" *ngIf="showHistoryModal" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
    <div class="modal-content" style="background: white; border-radius: 12px; width: 500px; max-width: 90vw; padding: 0; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.15);">
      <div class="modal-header" style="background: #f8fafc; padding: 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; color: var(--text-primary); font-size: 1.25rem;">Historique de modification</h3>
        <button (click)="closeHistory()" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary);">&times;</button>
      </div>
      <div class="modal-body" style="padding: 24px;">
        <h4 style="margin-top: 0; margin-bottom: 20px; color: var(--primary);">{{ selectedHistoryQuestion?.text }}</h4>
        
        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
          <div style="flex: 1; padding: 16px; background: #f1f5f9; border-radius: 8px;">
            <div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px; font-weight: 600;">Valeur avant</div>
            <div style="font-weight: 600; color: #64748b;">{{ selectedHistoryQuestion?.originalValue || 'Non renseigné' }}</div>
          </div>
          
          <div style="display: flex; align-items: center; color: var(--text-secondary);">
            <i class="fas fa-arrow-right"></i>
          </div>
          
          <div style="flex: 1; padding: 16px; background: #fff7ed; border: 1px solid #fdba74; border-radius: 8px;">
            <div style="font-size: 0.85rem; color: #ea580c; text-transform: uppercase; margin-bottom: 8px; font-weight: 600;">Valeur après</div>
            <div style="font-weight: 600; color: #c2410c;">{{ selectedHistoryQuestion?.value }}</div>
          </div>
        </div>

        <div style="display: flex; gap: 16px; font-size: 0.9rem; color: var(--text-secondary); background: #f8fafc; padding: 12px 16px; border-radius: 8px;">
          <div><i class="fas fa-user-md" style="margin-right: 8px;"></i>Modifié par : <strong>{{ selectedHistoryQuestion?.modifiedBy || 'Dr. Médecin' }}</strong></div>
          <div><i class="fas fa-clock" style="margin-right: 8px;"></i>Le : <strong>{{ selectedHistoryQuestion?.modifiedAt || 'Aujourd&apos;hui' }}</strong></div>
        </div>
      </div>
      <div class="modal-footer" style="padding: 16px 24px; border-top: 1px solid var(--border); text-align: right;">
        <button (click)="closeHistory()" style="background: var(--primary); color: white; border: none; padding: 10px 24px; border-radius: 6px; font-weight: 600; cursor: pointer;">Fermer</button>
      </div>
    </div>
  </div>
</div>
`;

if (!html.includes('showHistoryModal')) {
    html = html.replace('</div>\n</div>', '</div>\n' + popinHTML);
}

// Ensure undo visibility logic matches request explicitly
html = html.replace(/\*ngIf="isEditMode && q\.modified"/g, '*ngIf="isEditMode && q.modified"'); // already ok
html = html.replace(/\(click\)="showHistory\(q\)" title="Voir l'historique" style=".*?"(?: \S+)*?(?: \S+)*?>/g, 
  `(click)="showHistory(q)" title="Voir l'historique" style="background: transparent; border: none; color: var(--text-secondary); cursor: pointer; font-size: 1.2rem;" *ngIf="q.modified">`);

// left legend resize
html = html.replace(/<div class="sidebar-legend" style="margin: 16px; margin-top: auto;">[\s\S]*?<\/div>/,
`<div class="sidebar-legend" style="margin: 12px; margin-top: auto; padding: 10px; font-size: 0.75rem;">
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
        <i class="fas fa- stethoscope legend-icon" style="width:16px;text-align:center;"></i> <span>Pro</span>
      </div>
      <div class="legend-row" style="margin-bottom: 2px;">
        <i class="fas fa-hands-helping legend-icon" style="width:16px;text-align:center;"></i> <span>Patient + pro</span>
      </div>
    </div>`);

fs.writeFileSync(htmlPath, html);
console.log("HTML patched with history modal and legend sized down");
