const fs = require('fs');

function replaceTitle(filePath) {
    let code = fs.readFileSync(filePath, 'utf8');
    code = code.replace(/<h2>Sentinel Care Pro<\/h2>/g, '<img src="/images/logo-blanc.png" alt="Sentinel Care" style="max-width: 200px; margin-bottom: 20px;" />');
    fs.writeFileSync(filePath, code);
}

replaceTitle('src/app/pages/auth/login.component.ts');
replaceTitle('src/app/pages/auth/register.component.ts');
replaceTitle('src/app/pages/auth/register/register.ts');