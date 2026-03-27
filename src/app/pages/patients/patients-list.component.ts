import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Zone Header Verte pour Dossier Patient -->
    <div class="global-search-area">
      <div class="header-green-content">
        <a routerLink="/dashboard" class="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Retour
        </a>
        <h2 class="page-title-green">Dossiers patients</h2>
        
        <div class="search-controls">
          <div class="search-input-box">
             <input type="text" placeholder="Nom, Prénom, ID, Consultation..." (input)="onSearch($event)">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <button class="btn-search">Rechercher</button>
        </div>
      </div>
    </div>

    <div class="patients-page">
      
      <!-- Top bar for Patients List (Actions only) -->
      <div class="top-bar">
        <div>
          <p class="subtitle">Gérez et consultez tous les patients enregistrés</p>
        </div>
        
        <div class="actions-group">
          <!-- Filtre Button Opens Popup -->
          <div class="filter-container">
            <button class="btn-outline" (click)="toggleFilters()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Filtrer
            </button>
            
            <!-- Popup des filtres -->
            <div class="filter-popup" *ngIf="showFilters">
              <h4>Filtres</h4>
              <div class="filter-group">
                <label>Date de modification</label>
                <div class="filter-row">
                  <input type="date" placeholder="Avant" class="filter-input">
                  <input type="date" placeholder="Après" class="filter-input">
                </div>
              </div>
              <div class="filter-group">
                <label>Choix de l'étude clinique</label>
                <select class="filter-input">
                  <option>Toutes</option>
                  <option>Étude Alpha</option>
                  <option>Étude Beta</option>
                </select>
              </div>
              <div class="filter-group">
                <label>Choix du suivi thérapeutique</label>
                <select class="filter-input">
                  <option>Tous</option>
                  <option>En cours</option>
                  <option>Terminé</option>
                </select>
              </div>
              <div class="filter-group">
                <label>Statut</label>
                <select class="filter-input">
                  <option>Tous</option>
                  <option>Actif</option>
                  <option>En attente</option>
                  <option>Validé</option>
                </select>
              </div>
              <button class="btn-apply-filters" (click)="toggleFilters()">Appliquer</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Table Card with nice margins & padding -->
      <div class="card full-table-card">
        <div class="table-responsive">
          <table class="data-table modified-table">
            <thead>
              <tr>
                <th>IDENTITÉ</th>
                <th>SUIVI THÉRAPEUTIQUE</th>
                <th>ÉTUDE CLINIQUE</th>
                <th>DERNIÈRES MODIFICATIONS</th>
                <th>STATUT</th>
                <th style="text-align: right;"></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of patients">
                <td class="font-medium text-dark identity-col">
                  <div class="identity-info-grid">
                    <div class="id-row">
                      <div class="identity-name">{{ p.nom }} {{ p.prenom }}</div>
                      <div class="identity-detail">{{ p.dob }}</div>
                    </div>
                    <div class="id-row">
                      <div class="identity-detail">{{ p.email }}</div>
                      <div class="identity-detail">{{ p.phone }}</div>
                    </div>
                  </div>
                </td>
                <td class="text-gray">
                  <div style="display: flex; align-items: center;" *ngIf="p.suivi">
                    <div class="vignette-triangle" [ngClass]="getVignetteClass(p.suivi)"></div>
                    <span>{{ p.suivi }}</span>
                  </div>
                  <div *ngIf="!p.suivi" style="text-align: center; color:#94a3b8;">-</div>
                </td>
                <td class="text-gray">
                  <ng-container *ngIf="p.etudes && p.etudes.length > 0; else noEtude">
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      <div *ngFor="let etu of p.etudes" style="display: flex; align-items: center; justify-content: flex-start; gap: 8px;">
                        <div style="display: flex; align-items: center;">
                          <div class="vignette-triangle" [ngClass]="getVignetteClass(etu.name)"></div>
                          <span>{{ etu.name }}</span>
                        </div>
                        <span style="color: #94a3b8; font-size: 13px;">{{ etu.duree }}</span>
                      </div>
                    </div>
                  </ng-container>
                  <ng-template #noEtude>
                    <div style="text-align: center; color:#94a3b8;">-</div>
                  </ng-template>
                </td>
                <td class="text-gray">{{ p.lastModif }}</td>
                <td>
                  <span class="status-badge" [ngClass]="p.statusClass">{{ p.status }}</span>
                </td>
                <td style="text-align: right;">
                  <!-- Bouton Oeil dans un cercle vert -->
                  <button class="circle-green" [routerLink]="['/patients', 1]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination Footer -->
        <div class="card-footer">
          <span class="text-gray text-sm">Affichage de 1 à 5 sur 120 entrées</span>
          <div class="pagination">
            <button class="page-btn" disabled>&lt; Préc</button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
            <button class="page-btn">Suiv &gt;</button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .global-search-area {
      background-color: #204131;
      padding: 20px 40px 40px 40px;
      color: white;
    }
    .header-green-content {
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: white;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.2s;
      align-self: flex-start;
    }
    .back-link:hover {
      opacity: 1;
      text-decoration: underline;
    }
    .page-title-green {
      margin: 0 0 20px 0;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
    }

    .search-controls {
      display: flex;
      gap: 16px;
      width: 100%;
      max-width: 800px;
    }
    .search-input-box {
      flex: 1;
      position: relative;
    }
    .search-input-box input {
      width: 100%;
      padding: 14px 20px;
      border: none;
      border-radius: 6px;
      font-size: 15px;
      color: #333;
      outline: none;
    }
    .search-input-box svg {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }
    .btn-search {
      background: #11221a;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0 30px;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      z-index: 0;
      position: relative;
    }

    .patients-page {
      padding: 40px;
      max-width: 1600px;
      margin: 0 auto;
      font-family: inherit;
    }

    /* TOP BAR */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }
    .subtitle {
      color: #6b7280;
      margin: 0;
      font-size: 15px;
    }

    .actions-group {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    /* FILTRES POPUP */
    .filter-container {
      position: relative;
    }
    .filter-popup {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      border: 1px solid #e5e7eb;
      padding: 20px;
      width: 320px;
      z-index: 100;
      text-align: left;
    }
    .filter-popup h4 {
      margin: 0 0 16px 0;
      font-size: 16px;
      color: #1a2233;
    }
    .filter-group {
      margin-bottom: 16px;
    }
    .filter-group label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #4b5563;
      margin-bottom: 6px;
    }
    .filter-row {
      display: flex;
      gap: 8px;
    }
    .filter-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
    }
    .btn-apply-filters {
      width: 100%;
      background: #204131;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }

    /* BOUTON OUTLINE */
    .btn-outline {
    }
    .search-wrap input {
      width: 100%;
      padding: 12px 16px 12px 42px;
      border: 1px solid #e5e7eb;
      border-radius: 8px; /* Standard rect for patient list */
      font-size: 14px;
      background-color: white;
      outline: none;
      transition: all 0.2s;
    }
    .search-wrap input:focus { border-color: #204131; }
    
    .btn-outline {
      background-color: white;
      color: #4b5563;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.2s;
      z-index: 0;
      position: relative;
    }
    .btn-outline:hover { background-color: #f9fafb; border-color: #d1d5db; }

    /* CARD ET TABLEAU */
    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
      border: 1px solid #f3f4f6;
      overflow: hidden;
    }
    .full-table-card {
      padding: 0;
    }
    
    .table-responsive { width: 100%; overflow-x: auto; }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table th {
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #6b7280;
      text-align: left;
      padding: 16px 24px;
      background-color: #f9fafb;
      border-bottom: 1px solid #f3f4f6;
    }
    .data-table td {
      padding: 20px 24px;
      font-size: 14px;
      border-bottom: 1px solid #f3f4f6;
      vertical-align: middle;
    }
    .data-table tr:hover td { background-color: #fdfdfd; }
    
    .identity-col {
      min-width: 380px;
    }
    .identity-info-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .id-row {
      display: grid;
      grid-template-columns: 200px 1fr;
      align-items: center;
      gap: 16px;
    }
    .identity-name {
      font-weight: 700;
      font-size: 14px;
      color: #1a2233;
    }
    .identity-detail {
      font-size: 14px;
      color: #6b7280;
      font-weight: 400;
    }

    .font-medium { font-weight: 600; }
    .text-dark { color: #1a2233; }
    .text-gray { color: #4b5563; }
    .text-sm { font-size: 13px; }

    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
    }
    .status-active { background: #e3fcec; color: #169347; }
    .status-waiting { background: #fef3c7; color: #b45309; }
    .status-complete { background: #f3f4f6; color: #4b5563; }

    /* BOUTON OEIL ROND VERT */
    .circle-green {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #204131;
      color: white;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .circle-green:hover { transform: scale(1.1); box-shadow: 0 4px 10px rgba(32,65,49,0.2); }

    /* FOOTER / PAGINATION */
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background-color: white;
    }
    .pagination { display: flex; gap: 8px; }
    .page-btn {
      padding: 6px 12px;
      border: 1px solid #e5e7eb;
      background: white;
      border-radius: 6px;
      color: #4b5563;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
    }
    .page-btn:hover:not(:disabled) { background: #f3f4f6; }
    .page-btn.active { background: #204131; color: white; border-color: #204131; }
    .page-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  `]
})
export class PatientsListComponent implements OnInit {
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let filtered = [...this.allPatients];
      
      if (params['filter'] === 'documents') {
        filtered = filtered.filter(p => p.hasDocuments);
      }
      
      if (params['etude']) {
        const etudeSearch = params['etude'].toLowerCase();
        filtered = filtered.filter(p => 
          p.etudes && p.etudes.some(e => e.name.toLowerCase().includes(etudeSearch))
        );
      }
      
      // Limiter l'affichage à 5 patients maximum
      this.baseFilteredPatients = filtered;
      this.applySearch();
    });
  }

  getVignetteClass(name: string): string {
    if (!name) return "vignette-none";
    const n = name.toLowerCase();
    if (n.includes("sévère") && !n.includes("non")) return "vignette-severe";
    if (n.includes("modéré")) return "vignette-modere";
    if (n.includes("alpha") || n.includes("trial a")) return "vignette-trial-a";
    if (n.includes("beta")) return "vignette-beta";
    if (n.includes("ecp-4")) return "vignette-ecp4";
    if (n.includes("eczemalife")) return "vignette-eczemalife";
    if (n.includes("elaris")) return "vignette-elaris";
    if (n.includes("exogen")) return "vignette-exogen";
    if (n.includes("aucun") || n.includes("non diagn")) return "vignette-none";
    return "vignette-other-study";
  }
  showFilters = false;
  searchQuery = '';
  baseFilteredPatients: any[] = [];

  onSearch(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    this.applySearch();
  }

  applySearch() {
    let filtered = this.baseFilteredPatients.length ? this.baseFilteredPatients : this.allPatients;
    if (this.searchQuery) {
      filtered = filtered.filter(p => {
         const search = this.searchQuery.replace(/\s+/g, ' ').trim();
         const terms = search.split(' ');
         
         const nom = p.nom.toLowerCase();
         const prenom = p.prenom.toLowerCase();
         // Cherche "Nom Prenom" ou "Prenom Nom"
         const fullA = nom + ' ' + prenom;
         const fullB = prenom + ' ' + nom;
         
         return fullA.includes(search) || fullB.includes(search) || (terms.every(t => nom.includes(t) || prenom.includes(t)));
      });
    }
    // Ne pas limiter l'affichage si une recherche est effectuée ou limiter à plus grand si besoin
    // Mais gardons 5 par défaut, limitons juste à la recherche
    this.patients = filtered.slice(0, 5);
  }


  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  patients: any[] = [];
  allPatients = [
    { nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@email.com', dob: '12/05/1980', phone: '06 12 34 56 78', suivi: 'Eczéma sévère', etudes: [{name: 'Eczema Care Trial A', duree: '12 mois'}], lastModif: '2026-03-15', status: 'Actif', statusClass: 'status-active', hasDocuments: false },
    { nom: 'Martin', prenom: 'Sophie', email: 'smartin@email.com', dob: '03/11/1992', phone: '07 89 01 23 45', suivi: null, etudes: [{name: 'Skin Life ECP4', duree: '12 mois'}, {name: 'Eczema Care Trial A', duree: '6 mois'}], lastModif: '2026-03-18', status: 'En attente', statusClass: 'status-waiting', hasDocuments: true },
    { nom: 'Bernard', prenom: 'Luc', email: 'lbernard@email.com', dob: '25/08/1975', phone: '06 98 76 54 32', suivi: 'Eczéma modéré', etudes: [{name: 'DermaTest', duree: '3 mois'}], lastModif: '2026-03-20', status: 'Complété', statusClass: 'status-complete', hasDocuments: false },
    { nom: 'Lefevre', prenom: 'Marie', email: 'mlefevre@email.com', dob: '14/02/1988', phone: '07 11 22 33 44', suivi: 'Patient non diagnostiqué', etudes: [], lastModif: '2026-03-10', status: 'Actif', statusClass: 'status-active', hasDocuments: true },
    { nom: 'Petit', prenom: 'Paul', email: 'paul.p@email.com', dob: '09/07/1965', phone: '06 55 44 33 22', suivi: 'Eczéma sévère', etudes: [{name: 'Eczema Plus Alpha', duree: '6 mois'}, {name: 'Skin Life ECP4', duree: '12 mois'}], lastModif: '2026-02-28', status: 'Actif', statusClass: 'status-active', hasDocuments: false },
    { nom: 'Dubois', prenom: 'Thomas', email: 't.dubois@email.com', dob: '30/01/1990', phone: '06 11 22 33 44', suivi: 'Eczéma sévère', etudes: [{name: 'Eczema Care Trial A', duree: '3 mois'}], lastModif: '2026-03-22', status: 'Actif', statusClass: 'status-active', hasDocuments: true },
    { nom: 'Roux', prenom: 'Camille', email: 'camille.roux@email.com', dob: '17/04/1985', phone: '07 22 33 44 55', suivi: 'Eczéma modéré', etudes: [{name: 'Skin Life ECP4', duree: '6 mois'}], lastModif: '2026-03-24', status: 'En attente', statusClass: 'status-waiting', hasDocuments: true },
    { nom: 'Moreau', prenom: 'Antoine', email: 'a.moreau@email.com', dob: '22/09/1972', phone: '06 33 44 55 66', suivi: 'Eczéma sévère', etudes: [{name: 'Eczema Care Trial A', duree: '6 mois'}, {name: 'DermaTest', duree: '12 mois'}], lastModif: '2026-03-25', status: 'Actif', statusClass: 'status-active', hasDocuments: false },
    { nom: 'Fournier', prenom: 'Julie', email: 'j.fournier@email.com', dob: '05/12/1995', phone: '07 44 55 66 77', suivi: 'Eczéma modéré', etudes: [{name: 'Eczema Care Trial A', duree: '3 mois'}, {name: 'Skin Life ECP4', duree: '12 mois'}], lastModif: '2026-03-21', status: 'Actif', statusClass: 'status-active', hasDocuments: true },
    { nom: 'Girard', prenom: 'Nicolas', email: 'ngirard@email.com', dob: '11/06/1982', phone: '06 55 66 77 88', suivi: 'Eczéma sévère', etudes: [{name: 'Skin Life ECP4', duree: '3 mois'}, {name: 'Elaris EM-II', duree: '6 mois'}], lastModif: '2026-03-19', status: 'Actif', statusClass: 'status-active', hasDocuments: false },
    { nom: 'Bonnet', prenom: 'Léa', email: 'lea.b@email.com', dob: '08/03/2001', phone: '07 66 77 88 99', suivi: 'Patient non diagnostiqué', etudes: [], lastModif: '2026-03-26', status: 'En attente', statusClass: 'status-waiting', hasDocuments: true },
    { nom: 'Robert', prenom: 'Michel', email: 'm.robert@email.com', dob: '15/10/1958', phone: '06 77 88 99 00', suivi: 'Eczéma sévère', etudes: [{name: 'Eczema Care Trial A', duree: '12 mois'}], lastModif: '2026-03-20', status: 'Complété', statusClass: 'status-complete', hasDocuments: false },
    { nom: 'Blanc', prenom: 'Élodie', email: 'eblanc@email.com', dob: '28/02/1993', phone: '07 88 99 00 11', suivi: 'Eczéma modéré', etudes: [{name: 'Skin Life ECP4', duree: '6 mois'}], lastModif: '2026-03-23', status: 'Actif', statusClass: 'status-active', hasDocuments: true }
  ];
}
