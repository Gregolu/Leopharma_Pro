const fs = require('fs');

const htmlContent = `<div class="reseau-layout">
  
  <!-- Left Panel: Search & List -->
  <div class="side-panel">
    <div class="header">
      <h1>Réseau Partenaires</h1>
      <p>Développez votre réseau professionnel de santé.</p>
    </div>

    <!-- Search / Filter Area -->
    <div class="search-section">
      <div class="search-box small-field">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Nom du confrère..." [(ngModel)]="searchQuery">
      </div>
      
      <div class="filters-row">
        <div class="filter-box small-field flex-1">
          <i class="fas fa-user-md"></i>
          <select [(ngModel)]="professionFilter">
            <option value="">Toutes spécialités</option>
            <option *ngFor="let prof of professions" [value]="prof">{{ prof }}</option>
          </select>
        </div>
        <div class="filter-box small-field flex-1">
          <i class="fas fa-map-marker-alt"></i>
          <input type="text" placeholder="Ville, CP..." [(ngModel)]="locationSearch">
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab-btn" [class.active]="activeTab() === 'discover'" (click)="setTab('discover')">
        Découvrir
      </button>
      <button class="tab-btn" [class.active]="activeTab() === 'connected'" (click)="setTab('connected')">
        Mes partenaires
      </button>
      <button class="tab-btn" [class.active]="activeTab() === 'pending'" (click)="setTab('pending')">
        Envoyés
        <span class="badge" *ngIf="pendingCount() > 0">{{pendingCount()}}</span>
      </button>
    </div>

    <!-- Results List -->
    <div class="results-list">
      <div class="no-results" *ngIf="filteredPartners().length === 0">
        <i class="fas fa-user-slash"></i>
        <p>Aucun professionnel trouvé pour cette recherche.</p>
      </div>

      <div class="partner-card" *ngFor="let partner of filteredPartners()" @fadeIn>
        <div class="partner-avatar">
          {{ partner.firstName.charAt(0) }}{{ partner.lastName.charAt(0) }}
        </div>
        <div class="partner-info">
          <h3>Dr. {{ partner.firstName }} {{ partner.lastName }}</h3>
          <p class="profession">{{ partner.profession }}</p>
          <p class="location"><i class="fas fa-map-marker-alt"></i> {{ partner.location }} <span class="distance" *ngIf="partner.distance">({{ partner.distance }} km)</span></p>
        </div>
        <div class="partner-actions">
           <!-- Depending on status -->
           <ng-container [ngSwitch]="partner.status">
             <button *ngSwitchCase="'none'" class="btn-primary-outline btn-sm action-btn" (click)="invitePartner(partner)">
               Envoyer
             </button>
             <button *ngSwitchCase="'pending'" class="btn-success-solid btn-sm action-btn" (click)="cancelInvitation(partner)">
               Envoyé le {{ todayDate }}
             </button>
             <button *ngSwitchCase="'connected'" class="btn-success-outline btn-sm action-btn">
               <i class="fas fa-check"></i> Partenaire
             </button>
           </ng-container>
        </div>
      </div>
    </div>
  </div>

  <!-- Right Panel: Map -->
  <div class="map-panel">
    <div class="map-container">
      <img src="assets/maps.png" alt="Map view" class="map-image" />
    </div>
  </div>
</div>`;

fs.writeFileSync('src/app/pages/reseau/reseau.html', htmlContent);

let scssContent = fs.readFileSync('src/app/pages/reseau/reseau.scss', 'utf8');

scssContent += `
.search-section {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.5rem !important;
  margin-bottom: 1rem !important;
}
.search-box {
  background: white;
}
.small-field {
  padding: 0.5rem;
  border-radius: 6px;
  background: white;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  height: 38px;
  box-sizing: border-box;
}

.small-field input, .small-field select {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.9rem;
  width: 100%;
}

.filters-row {
  display: flex;
  gap: 0.5rem;
}

.flex-1 { flex: 1; }

.map-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  background-color: #e5e5e5;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.btn-success-solid {
  background-color: var(--success-color, #169347);
  color: white;
  border: none;
  box-shadow: 0 2px 4px rgba(22, 147, 71, 0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.btn-success-solid:hover {
  background-color: #127539;
}
`;

fs.writeFileSync('src/app/pages/reseau/reseau.scss', scssContent);

console.log('Update Complete.');
