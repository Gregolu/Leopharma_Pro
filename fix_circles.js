const fs = require('fs');

function fixFiles() {
    const files = [
        'src/app/pages/patients/patient-detail/patient-detail.component.html',
        'src/app/pages/patients/patient-monitoring/patient-monitoring.html'
    ];

    for (let currentFile of files) {
        if (!fs.existsSync(currentFile)) continue;
        let content = fs.readFileSync(currentFile, 'utf8');

        // Regex to match from <svg... to </svg>
        const svgRegex = /<svg\s+viewBox="0 0 (\d+) (\d+)"[^>]*>([\s\S]*?)<\/svg>/g;
        
        let modified = content.replace(svgRegex, (match, vbW, vbH, innerSvg) => {
            let divs = [];
            
            // Remove <circle> from inner SVG and convert to div
            const circleRegex = /<circle\s+cx="([\d\.]+)"\s+cy="([\d\.]+)"\s+r="([\d\.]+)"\s+fill="([^"]+)"\s*\/?>(?:\s*<\/circle>)?/g;
            
            let newInnerSvg = innerSvg.replace(circleRegex, (circMatch, cx, cy, r, fill) => {
                let left = (parseFloat(cx) / parseFloat(vbW)) * 100;
                let top = (parseFloat(cy) / parseFloat(vbH)) * 100;
                let size = parseFloat(r) * 2;
                
                divs.push(`<div style="position: absolute; left: ${left}%; top: ${top}%; width: ${size}px; height: ${size}px; background-color: ${fill}; border-radius: 50%; transform: translate(-50%, -50%); z-index: 10;"></div>`);
                
                return ''; // remove circle from SVG
            });
            
            // If we didn't extract any circles, just return the match
            if (divs.length === 0) return match;
            
            // Reconstruct SVG + appended divs
            let newSvg = match.replace(innerSvg, newInnerSvg);
            
            return newSvg + '\n                        ' + divs.join('\n                        ');
        });

        fs.writeFileSync(currentFile, modified);
        console.log(`Updated circles in ${currentFile}`);
    }
}

fixFiles();
