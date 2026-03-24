const fs = require('fs');

let scss = fs.readFileSync('src/app/pages/exportation/exportation.scss', 'utf8');

const newSCSS = `// --- Etape 5 : Récapitulatif ---
.step5-centered { display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 480px; padding: 4rem; }
.summary-grid-box { 
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem; 
  background: $bg-main; padding: 3rem; border-radius: 12px; 
  margin-bottom: 2rem; width: 100%; max-width: 700px;
}
.detail-item { 
  display: flex; align-items: center; gap: 1rem; 
  .detail-icon { 
    width: 45px; height: 45px; border-radius: 50%; background: white; 
    color: $primary; display: flex; align-items: center; justify-content: center; 
    font-size: 1.2rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05); flex-shrink: 0;
  }
  .detail-texts { 
    display: flex; flex-direction: column; gap: 0.3rem;
    .detail-label { font-size: 0.9rem; color: $text-muted; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
    .detail-value { font-size: 1.15rem; color: $text-main; font-weight: 700; line-height: 1.3; }
  }
}
.export-status-zone { width: 100%; max-width: 700px; text-align: center; }
.status-alert {
  padding: 1.5rem; border-radius: 8px; font-weight: 600; font-size: 1.1rem;
  display: flex; align-items: center; justify-content: center; gap: 0.8rem;
  &.progress-alert { background: rgba($primary, 0.1); color: $primary; }
  &.success-alert { background: rgba($success, 0.15); color: darken($success, 10%); }
}
.btn-success { background: $success; color: white; &:hover { background: darken($success, 5%); } }
`;

const index = scss.indexOf('// ==============================================');
if (index !== -1) {
    const endHeader = scss.indexOf('// VUE: RÉCAPITULATIF (HORIZONTAL)', index);
    if (endHeader !== -1) {
        scss = scss.substring(0, index) + newSCSS;
    }
} else {
    // If it didn't find the exact match, let's just append it but only if missing.
}

fs.writeFileSync('src/app/pages/exportation/exportation.scss', scss);
console.log('done updating SCSS');
