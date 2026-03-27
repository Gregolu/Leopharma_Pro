import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InviteModalComponent } from '../../shared/components/invite-modal/invite-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, InviteModalComponent],
  template: `
    <!-- Zone de Recherche Globale Structurée comme l'image pour le Dashboard -->
    <div class="global-search-area">
      <h2>Recherche</h2>
      <div class="search-controls">
        <div class="search-input-box">
           <input type="text" placeholder="Nom, Prénom, ID, Consultation...">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <button class="btn-search">Rechercher</button>
        <button class="btn-invite" (click)="openInviteModal()">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
           Inviter
        </button>
      </div>
    </div>

    <div class="dashboard-structure">
      
      <div class="split-layout">
        
        <!-- ================= GAUCHE : Dernière activités ================= -->
        <div class="split-left">
          <h3 class="section-title">Mes derniers dossiers patients</h3>
          
          <div class="card full-table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>NOM ET PRÉNOM</th>
                <th>DATE DE NAISSANCE</th>
                <th>DERNIÈRE MODIFICATION</th>
                <th>STATUT</th>
                <th style="text-align: right;">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of recentPatients">
                <td class="font-medium text-dark">
                  <div class="user-cell">
                    <div class="avatar-initials">{{ p.lastName.charAt(0) }}{{ p.firstName.charAt(0) }}</div>
                    {{ p.lastName }} {{ p.firstName }}
                  </div>
                </td>
                <td class="text-gray">{{ p.dob }}</td>
                <td class="text-gray">{{ p.lastModif }}</td>
                <td>
                  <span class="status-badge" [ngClass]="p.badgeClass">{{ p.status }}</span>
                </td>
                <td style="text-align: right;">
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

          <div class="see-more-container" style="margin-top: 20px;">
            <button class="btn-dark" routerLink="/patients">Voir plus</button>
          </div>
        </div>

        <!-- DIVISEUR VERTICAL -->
        <div class="vertical-divider"></div>

        <!-- ================= DROITE : Dashboard ================= -->
        <div class="split-right">
          <h3 class="section-title">Mon tableau de bord</h3>
          
          <div class="dashboard-grid">
            
            <!-- Carte 1 : Total Patients -->
            <div class="stat-card">
              <div class="stat-top">
                <div class="stat-title primary-color">Patients</div>
                <div class="stat-icon primary-color">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              </div>
              <div class="stat-value primary-color">1350</div>
              <div class="stat-bottom">
                <div class="stat-subtext">Patients dans ma<br>base de données</div>
                <button class="btn-sm bg-primary" routerLink="/patients">Voir</button>
              </div>
            </div>

            <!-- Carte 2 : Awaiting -->
            <div class="stat-card">
              <div class="stat-top">
                <div class="stat-title warning-color">Documents partagés</div>
                <div class="stat-icon warning-color">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
              </div>
              <div class="stat-value warning-color">12</div>
              <div class="stat-bottom">
                <div class="stat-subtext">Nouveaux documents<br>récemment reçus</div>
                <button class="btn-sm bg-warning" [routerLink]="['/patients']" [queryParams]="{ filter: 'documents' }">Voir</button>
              </div>
            </div>

            <!-- Carte 3 : Enrolment 1 -->
            <div class="stat-card">
              <div class="stat-top" style="margin-bottom:12px;">
                <div class="stat-title" style="display:flex; align-items:center; gap:8px; color: var(--text-primary);">
                  <div class="vignette-triangle vignette-trial-a" style="margin-right:0;"></div>
                  <span style="font-weight:700;">Eczema Care Trial A</span>
                </div>
                <div class="stat-icon" style="color: var(--text-secondary);">
                  <i class="fas fa-vial"></i>
                </div>
              </div>
              <div class="stat-bottom-inline" style="border-top:1px solid var(--border); padding-top:12px; margin-bottom:16px;">
                <div class="stat-subtext formated-sub" style="color:var(--text-secondary);">Patients inclus<br>dans l'étude</div>
                <div class="stat-value-sm" style="color:#ec4899;">352</div>
              </div>
              <div class="bottom-center-btn">
                <button class="btn-full" style="background:#ec4899; color:white;" [routerLink]="['/patients']" [queryParams]="{ etude: 'Eczema Care Trial A' }">Voir</button>
              </div>
            </div>

            <!-- Carte 4 : Enrolment 2 -->
            <div class="stat-card">
              <div class="stat-top" style="margin-bottom:12px;">
                <div class="stat-title" style="display:flex; align-items:center; gap:8px; color: var(--text-primary);">
                  <div class="vignette-triangle vignette-ecp4" style="margin-right:0;"></div>
                  <span style="font-weight:700;">Skin Life ECP4</span>
                </div>
                <div class="stat-icon" style="color: var(--text-secondary);">
                  <i class="fas fa-vial"></i>
                </div>
              </div>
              <div class="stat-bottom-inline" style="border-top:1px solid var(--border); padding-top:12px; margin-bottom:16px;">
                <div class="stat-subtext formated-sub" style="color:var(--text-secondary);">Patients inclus<br>dans l'étude</div>
                <div class="stat-value-sm" style="color:#8b5cf6;">271</div>
              </div>
              <div class="bottom-center-btn">
                <button class="btn-full" style="background:#8b5cf6; color:white;" [routerLink]="['/patients']" [queryParams]="{ etude: 'Skin Life ECP4' }">Voir</button>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
    <app-invite-modal [isOpen]="isInviteModalOpen" (close)="closeInviteModal()"></app-invite-modal>
  `,
  styles: [`

    /* Structure Top Search */
    .global-search-area {
      background-color: #204131;
      background: linear-gradient(to bottom, #204131, #2c5943);
      padding: 30px 0 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
    }
    .global-search-area h2 {
      margin: 0 0 20px 0;
      font-size: 24px;
      font-weight: 700;
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
    .btn-invite {
      background: white;
      color: #1a2233;
      border: none;
      border-radius: 6px;
      padding: 0 20px;
      font-weight: 600;
      font-size: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .dashboard-structure {
      padding: 40px 40px 60px 40px; /* Ajout d'espace supplémentaire au dessus pour décoller de l'entête */
      max-width: 1600px;
      margin: 0 auto;
      background: white; 
    }

    /* SPLIT PRINCIPAL */
    .split-layout {
      display: flex;
      align-items: stretch;
      justify-content: center;
      margin-top: 20px;
    }
    
    .split-left {
      flex: 1;
      padding-right: 40px;
    }
    .split-right {
      flex: 1;
      padding-left: 40px;
    }
    
    .vertical-divider {
      width: 2px;
      background-color: #e5e7eb;
      border-radius: 2px;
      margin-top: 20px;
    }

    .section-title {
      text-align: center;
      font-size: 20px;
      font-weight: 800;
      color: #1a2233;
      margin-bottom: 40px;
    }

    /* STRUCTURE TABLE GAUCHE */
    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
      border: 1px solid #f3f4f6;
      overflow: hidden;
    }
    .full-table-card { padding: 0; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th {
      text-transform: uppercase; font-size: 12px; font-weight: 700;
      letter-spacing: 0.5px; color: #6b7280; text-align: left;
      padding: 16px 24px; background-color: #f9fafb;
      border-bottom: 1px solid #f3f4f6;
    }
    .data-table td {
      padding: 20px 24px; font-size: 14px;
      border-bottom: 1px solid #f3f4f6; vertical-align: middle;
    }
    .data-table tr:hover td { background-color: #fdfdfd; }
    
    .user-cell { display: flex; align-items: center; gap: 12px; }
    .avatar-initials {
      width: 36px; height: 36px; border-radius: 50%;
      background-color: #e3fcec; color: #204131;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 13px;
    }

    .font-medium { font-weight: 600; }
    .text-dark { color: #1a2233; }
    .text-gray { color: #4b5563; }

    .status-badge {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 6px 14px; border-radius: 999px;
      font-size: 12px; font-weight: 700; min-width: 120px;
    }
    .status-active { background: #e3fcec; color: #169347; }
    .status-waiting { background: #fef3c7; color: #b45309; }
    .status-complete { background: #f3f4f6; color: #4b5563; }

    /* BOUTON OEIL ROND VERT */
    .circle-green {
      width: 36px; height: 36px; border-radius: 50%;
      background-color: #204131; color: white; border: none;
      display: inline-flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.2s;
    }
    .circle-green:hover { transform: scale(1.1); box-shadow: 0 4px 10px rgba(32,65,49,0.2); }

    .see-more-container {
      display: flex;
      justify-content: center;
    }
    .btn-dark {
      background: #1a2233;
      color: white;
      border: none;
      padding: 12px 30px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
    }

    /* STRUCTURE DASHBOARD DROITE */
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    
    .stat-card {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 20px 0;
      display: flex;
      flex-direction: column;
    }
    
    .stat-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
    }
    .stat-title { font-size: 15px; font-weight: 700; }
    .stat-value { font-size: 48px; font-weight: 500; line-height: 1; margin-bottom: 15px;}
    .stat-value-sm { font-size: 38px; font-weight: 500; line-height: 1;}
    
    .stat-bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: auto;
    }
    .stat-bottom-inline {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 20px;
    }

    .stat-subtext { font-size: 13px; color: #555; line-height: 1.4; }
    .formated-sub { font-size: 14px; font-weight: 500;}

    .btn-sm {
      color: white;
      border: none;
      padding: 8px 24px;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
    }
    .bottom-center-btn { display: flex; justify-content: center; }
    .btn-full {
      color: white;
      border: none;
      padding: 10px 40px;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
    }

    /* System de couleurs pour la structure (basé sur le screenshot mais simplifié) */
    .primary-color { color: #0d9488; }
    .bg-primary { background: #0d9488; }
    
    .warning-color { color: #f59e0b; }
    .bg-warning { background: #f59e0b; }
    
    .link-color { color: #1e3a8a; }
    .bg-link { background: #1e3a8a; }
    
    .purple-color { color: #9333ea; }
    .bg-purple { background: #9333ea; }
  `]
})
export class DashboardComponent {
  isInviteModalOpen = false;

  openInviteModal() {
    this.isInviteModalOpen = true;
  }

  closeInviteModal() {
    this.isInviteModalOpen = false;
  }

  recentPatients = [
    { firstName: 'Albert', lastName: 'Renard', dob: '12/06/1985', lastModif: '04/05/2026', status: 'Non connecté', badgeClass: 'status-complete' },
    { firstName: 'Elsa', lastName: 'Moreau', dob: '15/09/1990', lastModif: '03/05/2026', status: 'Document partagé', badgeClass: 'status-waiting' },
    { firstName: 'Lia', lastName: 'Simon', dob: '22/01/1988', lastModif: '02/05/2026', status: 'Connecté', badgeClass: 'status-active' },
    { firstName: 'Emeline', lastName: 'Lemoine', dob: '08/11/1975', lastModif: '01/05/2026', status: 'Document partagé', badgeClass: 'status-waiting' },
    { firstName: 'Marc', lastName: 'Dubois', dob: '30/03/1992', lastModif: '30/04/2026', status: 'Connecté', badgeClass: 'status-active' },
  ];
}
