const fs = require('fs');

// ==== 1. DETAIL FIX ====
let detailHtml = fs.readFileSync('src/app/pages/patients/patient-detail/patient-detail.component.html', 'utf8');

// The block to replace
const startMonitoring = '<div class="card card-monitoring" style="flex: 1; display: flex; flex-direction: column;">';
const endMonitoring = '</div>\n        </div>\n      </div>\n    </div>\n  </div>'; 

const detailGraphHtml = `
        <div class="card card-monitoring" style="flex: 1; display: flex; flex-direction: column;">
          <div class="card-header">
            <div class="ch-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              <h2>Monitoring</h2>
            </div>
            <button style="border: none; background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; color: #204131; cursor: pointer;" (click)="setTab('Monitoring')">Voir le monitoring</button>
          </div>
          <div class="card-body card-body-monitoring" style="flex: 1; display: flex; flex-direction: column; gap: 24px;">
            
            <!-- Graphe 1: Score eczéma -->
            <div class="chart-block">
               <div class="c-header">
                  <h3>Evolution des symptômes (IGA-CHE)</h3>
                  <div class="c-badge" style="color: #1e3a29;">1</div>
               </div>
               <div class="c-graph-layout">
                 <div class="y-axis">
                   <span>4</span>
                   <span>2</span>
                   <span>0</span>
                 </div>
                 <div class="c-graph-main">
                    <div class="c-wrap">
                      <svg viewBox="0 0 300 100" class="c-svg" preserveAspectRatio="none">
                         <!-- Graph line -->
                         <polyline points="40,40 80,47 120,80 160,86" fill="none" stroke="#1e293b" stroke-width="1.5"/>
                         <circle cx="40" cy="40" r="4" fill="#ff5a5f"/>
                         <circle cx="80" cy="47" r="4" fill="#ff5a5f"/>
                         <circle cx="120" cy="80" r="4" fill="#1e3a29"/>
                         <circle cx="160" cy="86" r="4" fill="#1e3a29"/>
                      </svg>
                      <!-- Moyenne ligne -->
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

            <!-- Graphe 2: Qualité de vie -->
            <div class="chart-block">
               <div class="c-header">
                  <h3>Evolution de la qualité de vie (BoHG)</h3>
                  <div class="c-badge" style="color: #1e3a29;">14</div>
               </div>
               <div class="c-graph-layout">
                 <div class="y-axis">
                   <span>48</span>
                   <span>24</span>
                   <span>0</span>
                 </div>
                 <div class="c-graph-main">
                    <div class="c-wrap">
                      <svg viewBox="0 0 300 100" class="c-svg" preserveAspectRatio="none">
                         <!-- Graph line -->
                         <polyline points="40,35 80,42 120,82 160,85" fill="none" stroke="#1e293b" stroke-width="1.5"/>
                         <circle cx="40" cy="35" r="4" fill="#ff5a5f"/>
                         <circle cx="80" cy="42" r="4" fill="#ff5a5f"/>
                         <circle cx="120" cy="82" r="4" fill="#1e3a29"/>
                         <circle cx="160" cy="85" r="4" fill="#1e3a29"/>
                      </svg>
                      <!-- Moyenne ligne -->
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

          </div>`;

let idxStart = detailHtml.indexOf(startMonitoring);
if (idxStart > -1) {
    let nextDivEnd = detailHtml.indexOf('          </div>\n        </div>\n      </div>\n    </div>\n  </div>', idxStart);
    if(nextDivEnd > -1) {
       detailHtml = detailHtml.substring(0, idxStart) + detailGraphHtml + "\n        " + detailHtml.substring(nextDivEnd + 17);
       fs.writeFileSync('src/app/pages/patients/patient-detail/patient-detail.component.html', detailHtml);
       console.log('Detail fixed.');
    } else {
        console.log('Could not find end of monitoring card');
    }
} else {
    console.log('Did not find monitoring tag');
}


// ==== 2. MONITORING FIX ====
const monitoringHtml = `
<div class="page-container page-monitoring">
  <div class="header-actions">
    <div class="date-selector">
      <i class="fas fa-calendar-alt"></i>
      <select>
        <option>Derniers 30 jours</option>
        <option>Derniers 3 mois</option>
        <option>Personnalisé</option>
      </select>
    </div>
    <button class="btn-primary" (click)="openAlertModal('global')">
      <i class="fas fa-bell"></i> Paramétrer les alertes
    </button>
  </div>

  <div class="grid-row-2">
    
    <!-- CARD: SCORE IGA-CHE -->
    <div class="card card-graph">
      <div class="card-header">
        <div class="ch-left">
          <div style="width: 36px; height: 36px; border-radius: 8px; background: #eff6ff; display: flex; align-items: center; justify-content: center; color: #2563eb; margin-right: 12px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600; color: #1e293b;">Évolution symptômes (IGA-CHE)</h3>
          </div>
        </div>
      </div>
      <div class="card-body">
        
        <div class="chart-block" style="border:none; padding:0;">
            <div class="c-graph-layout">
                <div class="y-axis">
                    <span>4</span>
                    <span>2</span>
                    <span>0</span>
                </div>
                <div class="c-graph-main">
                <div class="c-wrap" style="height: 250px;">
                    <svg viewBox="0 0 300 100" class="c-svg" preserveAspectRatio="none" style="height: 100%;">                                                                                               
                        <!-- Graph line -->
                        <polyline points="40,40 80,47 120,80 160,86" fill="none" stroke="#1e293b" stroke-width="1.5"/>                                                                  
                        <circle cx="40" cy="40" r="4" fill="#ff5a5f"/>
                        <circle cx="80" cy="47" r="4" fill="#ff5a5f"/>
                        <circle cx="120" cy="80" r="4" fill="#1e3a29"/>
                        <circle cx="160" cy="86" r="4" fill="#1e3a29"/>
                    </svg>
                    <!-- Moyenne ligne -->
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
    </div>

    <!-- CARD: SCORE BOHG -->
    <div class="card card-graph">
      <div class="card-header">
        <div class="ch-left">
          <div style="width: 36px; height: 36px; border-radius: 8px; background: #eff6ff; display: flex; align-items: center; justify-content: center; color: #2563eb; margin-right: 12px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path></svg>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600; color: #1e293b;">Qualité de vie (BoHG)</h3>
          </div>
        </div>
      </div>
      <div class="card-body">
        
            <div class="chart-block" style="border:none; padding:0;">
               <div class="c-graph-layout">
                 <div class="y-axis">
                   <span>48</span>
                   <span>24</span>
                   <span>0</span>
                 </div>
                 <div class="c-graph-main">
                    <div class="c-wrap" style="height: 250px;">
                      <svg viewBox="0 0 300 100" class="c-svg" preserveAspectRatio="none" style="height: 100%;">
                         <!-- Graph line -->
                         <polyline points="40,35 80,42 120,82 160,85" fill="none" stroke="#1e293b" stroke-width="1.5"/>
                         <circle cx="40" cy="35" r="4" fill="#ff5a5f"/>
                         <circle cx="80" cy="42" r="4" fill="#ff5a5f"/>
                         <circle cx="120" cy="82" r="4" fill="#1e3a29"/>
                         <circle cx="160" cy="85" r="4" fill="#1e3a29"/>
                      </svg>
                      <!-- Moyenne ligne -->
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
    </div>

  </div>
</div>
`;

fs.writeFileSync('src/app/pages/patients/patient-monitoring/patient-monitoring.html', monitoringHtml);
console.log('Monitoring fixed.');
