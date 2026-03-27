const fs = require('fs');
let styles = fs.readFileSync('src/styles.scss', 'utf8');

const newStyles = `/* SYSTEME DE VIGNETTES TRIANGLES POUR SUIVIS / ETUDES */
.vignette-triangle {
    display: inline-flex;
    width: 12px;
    height: 12px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    margin-right: 8px;
    flex-shrink: 0;
    align-self: center;
}
.vignette-modere { background-color: #10b981; } /* Vert : Eczéma modéré */
.vignette-severe { background-color: #ef4444; } /* Rouge : Eczéma sévère */
.vignette-trial-a { background-color: #ec4899; } /* Rose : Eczema Care Trial A */
.vignette-beta { background-color: #f59e0b; } /* Orange : Beta */
.vignette-alpha { background-color: #3b82f6; } /* Bleu : Alpha */
`;

styles = styles.replace(/\/\* GLOBAL PASTILLES FOR STUDIES AND FOLLOW-UPS \*\/[\s\S]*?\.pastille-beta \{[^}]+\}/, newStyles);

fs.writeFileSync('src/styles.scss', styles);
