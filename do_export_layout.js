const fs = require('fs');

const path = 'src/app/pages/exportation/exportation.scss';
let scss = fs.readFileSync(path, 'utf8');

const regex = /\.summary-grid-box\s*\{[\s\S]*?\.export-status-zone/;
const newCss = `.summary-grid-box { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  gap: 24px;
  margin-bottom: 24px; 
  width: 100%;
}
.detail-item { 
  display: flex; 
  align-items: flex-start; 
  gap: 1.2rem;
  background: white;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e1e7ec;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03), 0 2px 4px -2px rgba(0,0,0,0.03);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px -3px rgba(0,0,0,0.05), 0 4px 6px -4px rgba(0,0,0,0.02);
  }

  .detail-icon { 
    width: 48px; 
    height: 48px; 
    border-radius: 12px; 
    background: #f0fdf4;
    color: #15803d; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    font-size: 1.4rem; 
    flex-shrink: 0;
  }
  .detail-texts { 
    display: flex; 
    flex-direction: column;
    gap: 4px;
    margin-top: 2px;
    .detail-label { 
      font-size: 0.8rem; 
      color: #64748b; 
      text-transform: uppercase; 
      font-weight: 700; 
      letter-spacing: 0.5px; 
    }
    .detail-value { 
      font-size: 1.15rem; 
      color: #1e293b; 
      font-weight: 700; 
      line-height: 1.3; 
      word-break: break-word;
    }
  }
}

.export-status-zone`;

if (regex.test(scss)) {
    scss = scss.replace(regex, newCss);
    fs.writeFileSync(path, scss);
    console.log('SCSS updated');
} else {
    console.log('Regex did not match SCSS');
}
