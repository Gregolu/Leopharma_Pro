const fs = require('fs');
let scss = fs.readFileSync('src/app/pages/exportation/exportation.scss', 'utf8');

// remove everything from '.wizard-footer-cta' downwards to recreate a clean end
let cutoff = scss.indexOf('.wizard-footer-cta');
if (cutoff !== -1) {
    scss = scss.substring(0, cutoff);
}

scss += `.wizard-footer-cta { text-align: center; margin-top: 2rem; margin-bottom: 2rem;}

// ==============================================
// VUE: RÉCAPITULATIF (ETAPE 5)
// ==============================================
.step5-centered { display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 480px; padding: 4rem; }
.summary-grid-box { 
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem; 
  background: $bg-main; padding: 3rem; border-radius: 12px; 
  margin-bottom: 2rem; width: 100%; max-width: 750px;
}
.detail-item { 
  display: flex; align-items: center; gap: 1.5rem; 
  .detail-icon { 
    width: 60px; height: 60px; border-radius: 50%; background: white; 
    color: $primary; display: flex; align-items: center; justify-content: center; 
    font-size: 1.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); flex-shrink: 0;
  }
  .detail-texts { 
    display: flex; flex-direction: column; gap: 0.3rem; text-align: left;
    .detail-label { font-size: 0.95rem; color: $text-muted; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
    .detail-value { font-size: 1.25rem; color: $text-main; font-weight: 700; line-height: 1.3; }
  }
}
.export-status-zone { width: 100%; max-width: 750px; text-align: center; }
.status-alert {
  padding: 1.5rem; border-radius: 8px; font-weight: 600; font-size: 1.1rem;
  display: flex; align-items: center; justify-content: center; gap: 0.8rem;
  &.progress-alert { background: rgba($primary, 0.1); color: $primary; }
  &.success-alert { background: rgba($success, 0.15); color: darken($success, 10%); }
}
.action-submit-block { text-align: center; }
.btn-success { background: $success; color: white; border:none; &:hover { background: darken($success, 5%); } }
`

fs.writeFileSync('src/app/pages/exportation/exportation.scss', scss);
