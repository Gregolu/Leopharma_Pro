const fs = require('fs');
const path = require('path');

function walk(d) {
    let files = fs.readdirSync(d);
    for (let f of files) {
        let p = path.join(d, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (p.endsWith('.html') || p.endsWith('.ts')) {
            let c = fs.readFileSync(p, 'utf8');
            let n = c;
            
            // Check for explicit "Suivi: Eczéma sévère" etc and add badge if missing HTML element
            // This regex tries to find text like "Eczéma sévère" that isn't already preceded by a vignette
            // But let's verify existing matches first.
            let matches = n.match(/Eczéma sévère/g);
            if(matches) {
               // Just to know where they are
               console.log('Found "Eczéma sévère" in ' + p);
            }
        }
    }
}
walk('src/app');
