const fs = require('fs');

const PASTILLE_CSS = \`
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
\`;

function replacePastilleInList(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // style replacement
    content = content.replace(/\.triangle-vignette[\s\S]*?\.triangle-green \{.*?\}\n/, PASTILLE_CSS);
    
    // html replacement
    content = content.replace(/<div class="triangle-vignette"[^>]*><\/div>/g, (match) => {
        if (match.includes('suivi')) {
            return `<div class="color-pastille" [ngClass]="{'pastille-severe': p.suivi.includes('sévère'), 'pastille-modere': p.suivi.includes('modéré'), 'pastille-beta': !p.suivi.includes('sévère') && !p.suivi.includes('modéré')}"></div>`;
        } else if (match.includes('etude')) {
            return `<div class="color-pastille" [ngClass]="{'pastille-trial-a': p.etude.includes('Alpha') || p.etude.includes('Trial A'), 'pastille-beta': p.etude.includes('Beta')}"></div>`;
        }
        return match;
    });
    
    fs.writeFileSync(file, content);
}

replacePastilleInList('src/app/pages/patients/patients-list.component.ts');

const dossierHtmlFile = 'src/app/pages/patients/patient-dossier/patient-dossier.component.html';
if(fs.existsSync(dossierHtmlFile)) {
    let dh = fs.readFileSync(dossierHtmlFile, 'utf8');
    dh = dh.replace(/<div class="triangle-vignette triangle-pink"><\/div>/g, '<div class="color-pastille pastille-severe"></div>');
    dh = dh.replace(/<div class="triangle-vignette triangle-green"><\/div>/g, '<div class="color-pastille pastille-trial-a"></div>');
    fs.writeFileSync(dossierHtmlFile, dh);
}

const dossierScssFile = 'src/app/pages/patients/patient-dossier/patient-dossier.component.scss';
if(fs.existsSync(dossierScssFile)) {
    let ds = fs.readFileSync(dossierScssFile, 'utf8');
    ds = ds.replace(/\.triangle-vignette[\s\S]*?\.triangle-green \{.*?\}/, PASTILLE_CSS);
    fs.writeFileSync(dossierScssFile, ds);
}

console.log("Pastilles applied to List and Dossier");
