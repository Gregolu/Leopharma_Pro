const fs = require('fs');
const cssFile = 'src/app/pages/patients/patient-dossier/patient-dossier.component.scss';
let text = fs.readFileSync(cssFile, 'utf8');

if (!text.includes('ui-card-btn')) {
text += `
/* ======================== CUSTOM Q1 UI ======================== */
.ui-card-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--border); border-radius: 12px; padding: 24px 16px; background: white; cursor: pointer; transition: all 0.2s ease; color: var(--text-secondary); }
.ui-card-btn:hover:not(.disabled) { border-color: var(--primary); background: #f8fafc; }
.ui-card-btn.selected { border-color: var(--primary); background: #f0fdf4; color: var(--primary); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1); }
.ui-card-btn.disabled { opacity: 0.5; cursor: default; }

.ui-selection-row { display: flex; align-items: center; border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; background: white; cursor: pointer; transition: all 0.2s; color: var(--text-primary); }
.ui-selection-row:hover:not(.disabled) { border-color: var(--primary); background: #f8fafc; }
.ui-selection-row.selected { border-color: var(--primary); background: #f0fdf4; color: var(--primary); }
.ui-selection-row.disabled { opacity: 0.5; cursor: default; }

.ui-card-small { text-align: center; border: 1px solid var(--border); border-radius: 8px; padding: 12px; background: white; cursor: pointer; transition: all 0.2s; color: var(--text-primary); height: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: center;}
.ui-card-small.selected { border-color: var(--primary); background: #f0fdf4; color: var(--primary); }
.ui-card-small.disabled { opacity: 0.5; cursor: default; }

.ui-stepper-btn { background: white; border: 1px solid var(--border); border-radius: 50%; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.2rem; color: var(--text-primary); transition: all 0.2s; }
.ui-stepper-btn:hover:not([disabled]) { border-color: var(--primary); color: var(--primary); background: #f8fafc;}
.ui-stepper-btn[disabled] { opacity: 0.4; cursor: default; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
.custom-card-block { box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
`;
fs.writeFileSync(cssFile, text);
console.log('Appended CSS to SCSS file.');
} else {
console.log('CSS already present.');
}
