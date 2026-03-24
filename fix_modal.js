const fs = require('fs');

let scss = fs.readFileSync('src/app/shared/components/invite-modal/invite-modal.component.scss', 'utf8');

scss = scss.replace(/background-color:\s*var\(--surface-card\);/g, 'background-color: #ffffff;');
scss = scss.replace(/color:\s*var\(--text-color\);/g, 'color: #1a2233;');
scss = scss.replace(/color:\s*var\(--text-secondary\);/g, 'color: #4b5563;');
scss = scss.replace(/color:\s*var\(--primary-color\);/g, 'color: #204131;'); 
scss = scss.replace(/border-bottom:\s*2px solid var\(--primary-color\);/g, 'border-bottom: 2px solid #204131;');
scss = scss.replace(/border-color:\s*var\(--primary-color\);/g, 'border-color: #204131;');
scss = scss.replace(/box-shadow:\s*0 0 0 2px rgba\(var\(--primary-color-rgb\),\s*0\.2\);/g, 'box-shadow: 0 0 0 2px rgba(32, 65, 49, 0.2);');

scss = scss.replace(/background-color:\s*rgba\(var\(--primary-color-rgb\),\s*0\.05\);/g, 'background-color: rgba(32, 65, 49, 0.05);');
scss = scss.replace(/border:\s*1px solid rgba\(var\(--primary-color-rgb\),\s*0\.2\);/g, 'border: 1px solid rgba(32, 65, 49, 0.2);');

scss = scss.replace(/background-color:\s*var\(--primary-color\);/g, 'background-color: #204131;');
scss = scss.replace(/border-color:\s*var\(--border-color\);/g, 'border-color: #e5e7eb;');
scss = scss.replace(/border:\s*1px solid var\(--border-color\);/g, 'border: 1px solid #e5e7eb;');
scss = scss.replace(/border-bottom:\s*1px solid var\(--border-color\);/g, 'border-bottom: 1px solid #e5e7eb;');
scss = scss.replace(/border-top:\s*1px solid var\(--border-color\);/g, 'border-top: 1px solid #e5e7eb;');
scss = scss.replace(/background-color:\s*var\(--surface-color\);/g, 'background-color: #f9fafb;');
scss = scss.replace(/background:\s*var\(--surface-color\);/g, 'background: #f9fafb;');

fs.writeFileSync('src/app/shared/components/invite-modal/invite-modal.component.scss', scss);
console.log('Modified modal CSS for white background and correct text colors.');
