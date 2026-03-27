const fs = require('fs');

let scss = fs.readFileSync('src/app/pages/exportation/exportation.scss', 'utf8');
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
    fonconst fs = require('fs');

let scs0;
let scss = fs.readFileS   const regex = /\.summary-grid-box\s*\{[\s\S]*?\.export-status-zone/;
const newCs  const newCss = `.summary-grid-box { 
  display: grid; 
  grid-templ
   display: grid; 
  grid-template-c    grid-template-00  gap: 24px;
  margin-bottom: 24px; 
  width: 100%;
}
.detail-    margin-bo:   width: 100%;
}
.deta #}
.deta 
      fo  display: fl0;   alignline-height  gap: 1.2rem;
  backgrounbr  background: }  padding: 24px;
  us  border-radiusge  border: 1px solid #cs  box-shadow: 0 4px 6px -1pCs  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: tra  
  &:hover {
    transform: translateY(-2px);ons    transfeg    bo not match SCSS');
}
