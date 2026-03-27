import re

p = 'src/app/pages/patients/patient-detail/patient-detail.component.html'
with open(p, 'r') as f:
    html = f.read()

# Eczema severe inline styles cleanup
html = re.sub(
    r'<div class="vignette-triangle vignette-severe"\s+style="[^\"]*"></div>\s*Eczéma sévère',
    '<div class="vignette-triangle vignette-severe"></div>Eczéma sévère',
    html
)

# Trial A inline styles cleanup
html = re.sub(
    r'<div class="vignette-triangle vignette-trial-a"\s+style="[^\"]*"></div>',
    '<div class="vignette-triangle vignette-trial-a"></div>',
    html
)

# SkinLife ECP-4 badge cleanup
html = html.replace(
    '<div class="lr-vignette color-green"></div>\n                  <span class="lr-name">SkinLife ECP-4</span>',
    '<div class="vignette-triangle vignette-ecp4"></div>\n                  <span class="lr-name">SkinLife ECP-4</span>'
)

with open(p, 'w') as f:
    f.write(html)
