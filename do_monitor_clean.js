const fs = require('fs');

const path = 'src/app/pages/patients/patient-monitoring/patient-monitoring.html';
const tsPath = 'src/app/pages/patients/patient-monitoring/patient-monitoring.ts';

const Graphe1 = `
            <!-- Graphe 1: IGA-CHE -->
            <div class="chart-wrapper">
                <div class="chart-block">
                    <div class="c-header">
                        <div class="header-left-title">
                            <h3>Evolution des symptômes (IGA-CHE)</h3>
                        </div>
                        <div class="actions-right">
                            <div class="c-badge" style="color: #1e3a29;">1</div>
                        </div>
                    </div>
                    <div class="c-graph-layout">
                        <div class="y-axis">
                            <span>4</span>
                            <span>2</span>
                            <span>0</span>
                        </div>
                        <div class="c-graph-main">
                        <div class="c-wrap">
                            <svg viewBox="0 0 300 100" class="c-svg" >          
                                <polyline points="40,40 80,47 120,80 160,86" fill="none" stroke="#1e293b" stroke-width="1.5"/>                                                                                                                                                  <circle cx="40" cy="40" r="4" fill="#ff5a5f"/>
                                <circle cx="80" cy="47" r="4" fill="#ff5a5f"/>
                                <circle cx="120" cy="80" r="4" fill="#1e3a29"/>
                                <circle cx="160" cy="86" r="4" fill="#1e3a29"/>
                            </svg>
                            <div class="mean-line-container" style="top: 50%;">
                                <div class="mean-line"></div>
                                <span class="mean-label">— Moy.</span>
                            </div>
                        </div>
                        <div class="x-axis">
                            <span>01.02.25</span>
                            <span>30.02.25</span>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
`;

const Graphe3 = `
            <!-- Graphe: Suivi des traitements -->
            <div class="chart-wrapper">
                <div class="chart-block">
                <div class="c-header">                                          
                    <div class="header-left-title">
                        <h3>Suivi des traitements</h3>
                    </div>
                </div>
                <div class="chart-legend" style="display: flex; gap: 16px; font-size: 13px; font-weight: 600; color: #1e293b; padding: 0 16px 12px 16px;">                                                                                                          <div style="display: flex; align-items: center; gap: 6px;"> 
                                                                                                        <div style="width: 12px; height: 12px; border-radius: 50%; background: #71c671;"></div> Crèmes hydratantes                                                  </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: #eab365;"></div> Hydrocortisone                                                                                                                                      </div>
                </div>
                <div class="c-graph-layout">
                    <div class="y-axis">
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                    </div>
                    <div class="c-graph-main">
                        <div class="c-wrap">
                        <svg viewBox="0 0 300 100" class="c-svg" >              
                            <rect x="40" y="20" width="12" height="40" fill="#71c671" rx="6" />                                                                                                                                                                             <rect x="40" y="55" width="12" height="35" fill="#eab365" rx="6" />                                                                                                                                                                             <ellipse cx="46" cy="95" rx="8" ry="2" fill="#e2e8f0"/>                                                                             
                            <rect x="70" y="45" width="12" height="30" fill="#71c671" rx="6" />                                                                                                                                                                             <rect x="70" y="65" width="12" height="25" fill="#eab365" rx="6" />                                                                                                                                                                             <ellipse cx="76" cy="95" rx="8" ry="2" fill="#e2e8f0"/>                                                                             
                            <rect x="90" y="40" width="12" height="20" fill="#71c671" rx="6" />                                                                                                                                                                             <rect x="90" y="52" width="12" height="38" fill="#eab365" rx="6" />                                                                                                                                                                             <ellipse cx="96" cy="95" rx="8" ry="2" fill="#e2e8f0"/>                                                                             
                            <rect x="130" y="65" width="12" height="20" fill="#71c671" rx="6" />                                                                                                                                                                            <rect x="130" y="80" width="12" height="10" fill="#eab365" rx="6" />                                                                                                                                                                            <ellipse cx="136" cy="95" rx="8" ry="2" fill="#e2e8f0"/>                                                                                                                                                                                    </svg>
                        <div class="mean-line-container" style="top: 50%;">
                            <div class="mean-line pink"></div>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
`;

const Graphe2 = `
            <!-- Graphe: Qualité de vie -->
            <div class="chart-wrapper">
                <div class="chart-block">
                    <div class="c-header">
                        <div class="header-left-title">
                            <h3>Evolution de la qualité de vie (BoHG)</h3>
                        </div>
                        <div class="actions-right">
                            <div class="c-badge" style="color: #1e3a29;">14</div>                                                                                                           
                        </div>
                    </div>
                    <div class="c-graph-layout">
                        <div class="y-axis">
                            <span>48</span>
                            <span>24</span>
                            <span>0</span>
                        </div>
                        <div class="c-graph-main">
                            <div class="c-wrap">
                            <svg viewBox="0 0 300 100" class="c-svg" >          
                                <polyline points="40,35 80,42 120,82 160,85" fill="none" stroke="#1e293b" stroke-width="1.5"/>                                                                                                                                                  <circle cx="40" cy="35" r="4" fill="#ff5a5f"/>
                                <circle cx="80" cy="42" r="4" fill="#ff5a5f"/>
                                <circle cx="120" cy="82" r="4" fill="#1e3a29"/>
                                <circle cx="160" cy="85" r="4" fill="#1e3a29"/>
                            </svg>
                            <div class="mean-line-container" style="top: 50%;">
                                <div class="mean-line"></div>
                                <span class="mean-label">— Moy.</span>
                            </div>
                            </div>
                            <div class="x-axis">
                                <span>01.02.25</span>
                                <span>30.02.25</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`;

const newHTML = `
<div class="patient-monitoring-container">

  <!-- Header Section -->
  <div class="monitoring-header">
    <div class="header-titles">
      <h2>Monitoring du patient</h2>
    </div>
    <div class="header-actions">
      <div class="btn-download-zone" (click)="downloadDossier()" style="cursor: pointer; display: flex; align-items: center; gap: 8px; background: #f8fafc; padding: 10px 16px; border-radius: 8px; border: 1px solid #cbd5e1; transition: all 0.2s;">
          <i class="fas fa-file-download" style="color: #204131; font-size: 1.2rem;"></i>
          <strong style="color: #1e293b; font-size: 0.95rem;">Télécharger le dossier patient</strong>
      </div>
    </div>
  </div>

  <div class="charts-grid" style="padding: 16px 0; display: flex; flex-direction: column; gap: 24px;">
      ${Graphe1}
      ${Graphe3}
      ${Graphe2}
  </div>

  <!-- Ajouter un nouveau graphe -->
  <div class="add-graph-container" style="border: 2px dashed #cbd5e1; border-radius: 12px; padding: 40px; text-align: center; margin-top: 24px; cursor: pointer; color: #64748b; background: white; transition: all 0.2s;" onmouseover="this.style.borderColor='#10b981'; this.style.backgroundColor='#f8fafc';" onmouseout="this.style.borderColor='#cbd5e1'; this.style.backgroundColor='white';">                <i class="fas fa-plus" style="font-size: 2.5rem; margin-bottom: 16px; color: #204131;"></i>                                                                     <p style="margin: 0; font-weight: 600; font-size: 1.1rem; color: #1e293b;">Ajouter un nouveau graphe</p>                                                      </div>

</div>
`;

fs.writeFileSync(path, newHTML);

const cleanTS = `
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-monitoring.html',
  styleUrls: ['./patient-monitoring.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientMonitoring {
  
  downloadDossier() {
    console.log("Downloading dossier...");
    window.open('images/Dossierpatient.pdf', '_blank');
  }

}
`;
fs.writeFileSync(tsPath, cleanTS);
console.log("Monitoring replace done!");
