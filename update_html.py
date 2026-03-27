import re

p = 'src/app/shared/components/study-modal/study-modal.component.html'
with open(p, 'r') as f:
    html = f.read()

# Eligibility button
if 'validateEligibility()' not in html:
    html = html.replace('</div>\n    </div>\n\n    <!-- SECTION 4: CONSENTEMENT & RGPD -->',
    '</div>\n      <div style="margin-top: 12px; text-align: right;" *ngIf="modalStatus === \'check-eligibility\'">\n        <button style="background:var(--primary); color:white; border:none; padding:8px 16px; border-radius:6px; cursor:pointer; font-weight:600;" (click)="validateEligibility()">Valider l\'éligibilité</button>\n      </div>\n    </div>\n\n    <!-- SECTION 4: CONSENTEMENT & RGPD -->')

# Send consent digital
html = html.replace('<button style="background:var(--primary); color:white; border:none; padding:8px 16px; border-radius:6px; cursor:pointer;"><i class="fas fa-paper-plane"></i> Envoyer le consentement</button>',
  '<button style="background:var(--primary); color:white; border:no  ; padding:8px 16px; border-radius:6px; cursor:pointer;" (click)="sendConsentDigital()" *ngIf="modalStatus === \'eligible\'"><i class="fas fa-paper-plane"></i> Envoyer le consentement</button>')

# Simulate signature
if 'simulatePatientSignature()' not in html:
    html = html.replace('<button style="background: #f1f5f9; border:1px solid #cbd5e1; padding:8px 16px; border-radius:6px; cursor:pointer;"><i class="fas fa-sync-alt"></i> Relancer / Renvoyer</button>',
    '<button style="background: #f1f5f9; border:1px solid #cbd5e1; padding:8px 16px; border-radius:6px; cursor:pointer; margin-right: 10px;" *ngIf="modalStatus === \'awaiting-consent\'"><i class="fas fa-sync-alt"></i> Relancer / Renvoyer</button>\n          <button style="background: #dbeafe; color: #1e40af; border:1px solid #bfdbfe; padding:8px 16px; border-radius:6px; cursor:pointer;" (click)="simulatePatientSignature()" *ngIf="modalStatus === \'awaiting-consent\'"><i class="fas fa-signature"></i> Simuler la signature patient</button>')

# Validate manual
html = re.sub(r'<button\s*style="border:none; padding:8px 16px; border-radius:6px; cursor:pointer; font-weight: 600;"\s*\[style\.background\]="rgpdChecked1 && rgpdChecked2 \? \'var\(--primary\)\' : \'#e2e8f0\'"\s*\[style\.color\]="rgpdChecked1 && rgpdChecked2 \? \'white\' : \'#94a3b8\'"\s*\[disabled\]="!rgpdChecked1 \|\| !rgpdChecked2">\s*<i class="fas fa-check"></i> Valider le consentement\s*</button>',
  '''<button 
              style="border:none; padding:8px 16px; border-radius:6px; cursor:pointer; font-weight: 600;"
              [style.background]="rgpdChecked1 && rgpdChecked2 ? \'var(--primary)\' : \'#e2e8f0\'"
              [style.color]="rgpdChecked1 && rgpdChecked2 ? \'white\' : \'#94a3b8\'"
              [disabled]="!rgpdChecked1 || !rgpdChecked2"
              (click)="validateManualConsent()"
              *ngIf="modalStatus === \'eligible\'">
              <i class="fas fa-check"></i> Valider le consentement
            </button>''', html)

# Section 4 Visibility
html = html.replace('<!-- SECTION 4: CONSENTEMENT & RGPD -->\n    <div class="sm-section">',
    '<!-- SECTION 4: CONSENTEMENT & RGPD -->\n    <div class="sm-section" *ngIf="modalStatus !== \'check-eligibility\' && modalStatus !== \'not-eligible\'">')

# Dates
html = html.replace("Aujourd'hui", "{{ study?.consentSentDate || 'Aujourd\\'hui' }}")
html = html.replace("14/10/2023", "{{ study?.consentSignedDate || '14/10/2023' }}")

with open(p, 'w') as f:
    f.write(html)
