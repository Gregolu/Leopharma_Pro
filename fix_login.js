const fs = require('fs');
let code = fs.readFileSync('src/app/pages/auth/login.component.ts', 'utf8');

// 1. Remove the white logo
code = code.replace(/<img src="\/images\/logo-blanc\.png"[^>]*>/g, '');

// 2. Modify dashboard-visual styles to center it nicely
code = code.replace(/\.dashboard-visual \{(?:[^{}]*|\{[^{}]*\})*\}/, `.dashboard-visual {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      max-width: 500px;
      height: auto;
      object-fit: contain;
      opacity: 0.1;
      pointer-events: none;
    }`);

fs.writeFileSync('src/app/pages/auth/login.component.ts', code);
