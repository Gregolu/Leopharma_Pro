const fs = require('fs');

const PASTILLE_CSS = `
.color-pastille {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
}
.pastille-severe { background-color: #ec4899; }
.pastille-modere { background-color: #3b82f6; }
.pastille-trial-a { background-color: #10b981; }
.pastille-beta { background-color: #f59e0b; }
`;

// 1. Dashboard
const dbPath = 'src/app/pages/dashboard/dashboard.component.ts';
let db = fs.readFileSync(dbPath, 'utf8');
if (!db.includes('.color-pastille')) {
    db = db.replace('styles: [`', 'styles: [`' + PASTILLE_CSS);
    db = db.replace(/<div class="triangle-vignette"><\/div>/g, '<div class="color-pastille pastille-severe"></div>');
    fs.writeFileSync(dbPath, db);
}

// 2. Patients List
const plPath = 'src/app/pages/patients/patients-list.component.ts';
let pl = fs.readFileSync(plPath, 'utf8');
pl = pl.replace(/\.triangle-vignette[\s\S]*?\.triangle-green \{.*?\}/, PASTILLE_CSS);
pl = pl.replace(/<div class="triangle-vignette"[^>]*><\/div>/g, (match) => {
    if (match.includes('suivi')) {
        return `<div class="color-pastille" [ngClass]="{'pastille-severe': p.suivi.includes('sévère'), 'pastille-modere': p.suivi.includes('modéré'), 'pastille-beta': !p.suivi.includes('sévère') && !p.suivi.includes('modéré')}"></div>`;
    } else if (match.includes('etude')) {
        return `<div class="color-pastille" [ngClass]="{'pastille-trial-a': p.etude.includes('Alpha') || p.etude.includes('Trial A'), 'pastille-beta': p.etude.includes('Beta')}"></div>`;
    }
    return match;
});
fs.writeFileSync(plPath, pl);

// 3. Dossier
const dh = 'src/app/pages/patients/patient-dossier/patient-dossier.component.html';
if (fs.existsSync(dh)) {
    let dhtml = fs.readFileSync(dh, 'utf8');
    dhtml = dhtml.replace(/<div class="triangle-vignette triangle-pink"><\/div>/g, '<div class="color-pastille pastille-severe"></div>');
    dhtml = dhtml.replace(/<div class="triangle-vignette triangle-green"><\/div>/g, '<div class="color-pastille pastille-trial-a"></div>');
    fs.writeFileSync(dh, dhtml);
}

const ds = 'src/app/pages/patients/patient-dossier/patient-dossier.component.scss';
if (fs.existsSync(ds)) {
    let dscss = fs.readFileSync(ds, 'utf8');
    dscss = dscss.replace(/\.triangle-vignette[\s\S]*?\.triangle-green \{.*?\}/, PASTILLE_CSS);
    fs.writeFileSync(ds, dscss);
}

console.log("Pastilles replaced.");
