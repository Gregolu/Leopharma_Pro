const fs = require('fs');

const file = 'src/app/pages/patients/patient-monitoring/patient-monitoring.html';
let content = fs.readFileSync(file, 'utf8');

// We have multiple chart blocks in `patient-monitoring.html`. We need to add dates to the "Suivi des traitements".
// We can find `<!-- Bar 4 (small) -->` which is inside that chart, and then find the closing `</div>` of `.c-wrap`!

let updatedContent = content.replace(
    /(<!-- Bar 4 \(small\) -->[\s\S]*?z-index: 10;"><\/div>\s*)(<\/div>)/,
    `$1</div>
                    <div class="x-axis" style="display: flex; justify-content: space-between; color: #64748b; font-size: 0.75rem; margin-top: 8px;">
                        <span>01.02.25</span>
                        <span>30.02.25</span>
                    </div>`
);

fs.writeFileSync(file, updatedContent);
console.log("Dates added to Suivi des traitements!");
