import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-container">
      
      <!-- Top Actions Bar -->
      <div class="top-bar flex justify-between items-center">
        <h2 class="page-title">Bonjour Dr. Dupont</h2>
        <div class="actions flex gap-4 items-center">
          <div class="search-wrap">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" class="search-input" placeholder="Rechercher un patient (nom, prénom, ID)" />
          </div>
          <button class="btn-primary flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Inviter un patient
          </button>
        </div>
      </div>

      <div class="dashboard-grid">
        <!-- Left Section: Activities -->
        <section class="left-section card">
          <div class="section-header flex justify-between items-center">
            <h3>Dernières activités</h3>
            <a routerLink="/patients" class="text-link">Voir tout</a>
          </div>

          <div class="activities-list flex-col gap-4">
            
            <div class="activity-item flex justify-between items-center" *ngFor="let activity of latestActivities">
              <div class="patient-info flex gap-4 items-center">
                <div class="avatar">{{ activity.name.charAt(0) }}</div>
                <div>
                  <h4 class="patient-name">{{ activity.name }}</h4>
                  <p class="patient-meta">Né(e) en {{ activity.yob }}</p>
                </div>
              </div>
              <div class="activity-detail">
                <p class="activity-text">{{ activity.action }}</p>
              </div>
              <div class="activity-status">
                <span class="badge" [ngClass]="activity.statusClass">{{ activity.status }}</span>
              </div>
            </div>

          </div>
        </section>

        <!-- Right Section: KPIs -->
        <section class="right-section flex-col gap-4">
          <div class="kpi-card card flex items-center justify-between">
            <div class="kpi-content">
              <h4>Patients</h4>
              <div class="kpi-value">1,248</div>
              <p class="kpi-text">patients dans la base</p>
            </div>
            <div class="kpi-actions flex-col items-center gap-4">
              <div class="kpi-icon icon-bg-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <button class="btn-outline">Voir</button>
            </div>
          </div>

          <div class="kpi-card card flex items-center justify-between">
            <div class="kpi-content">
              <h4>Patients actifs</h4>
              <div class="kpi-value text-green">432</div>
              <p class="kpi-text">patients connectés ou suivis</p>
            </div>
            <div class="kpi-actions flex-col items-center gap-4">
              <div class="kpi-icon icon-bg-green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <button class="btn-outline">Voir</button>
            </div>
          </div>
        </section>
      </div>

    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .top-bar {
      margin-bottom: 8px;
    }

    .page-title {
      font-size: 28px;
      color: var(--primary);
    }

    .search-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      color: var(--text-secondary);
    }

    .search-input {
      width: 320px;
      padding: 10px 16px 10px 40px;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-family: inherit;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
    }

    .section-header h3 {
      font-size: 20px;
      margin-bottom: 24px;
    }

    .text-link {
      color: var(--primary);
      text-decoration: none;
      font-weight: 700;
    }

    .activity-item {
      padding: 16px 0;
      border-bottom: 1px solid var(--border);
    }
    .activity-item:last-child { border-bottom: none; }

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--bg-color);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 20px;
    }

    .patient-name {
      margin: 0 0 4px 0;
      font-size: 16px;
    }

    .patient-meta {
      margin: 0;
      font-size: 14px;
      color: var(--text-secondary);
    }

    .activity-text {
      color: var(--text-primary);
      font-weight: 500;
      margin: 0;
    }

    .badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
    }
    .badge-active { background: #e6f4ea; color: #1e8e3e; }
    .badge-pending { background: #fff8e1; color: #f57c00; }
    .badge-unshared { background: #fce8e6; color: #d93025; }

    .kpi-card {
      padding: 32px 24px;
    }

    .kpi-content h4 {
      font-size: 18px;
      color: var(--text-secondary);
      margin-bottom: 12px;
    }

    .kpi-value {
      font-size: 48px;
      font-weight: 700;
      color: var(--primary);
      line-height: 1;
      margin-bottom: 8px;
    }

    .kpi-text {
      margin: 0;
      color: var(--text-secondary);
      font-size: 14px;
    }

    .text-green { color: #1e8e3e; }

    .kpi-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .icon-bg-primary {
      background: rgba(32, 65, 49, 0.1);
      color: var(--primary);
    }

    .icon-bg-green {
      background: rgba(30, 142, 62, 0.1);
      color: #1e8e3e;
    }

    .btn-outline {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-primary);
      padding: 6px 16px;
      border-radius: 6px;
      font-family: inherit;
      font-weight: 700;
      cursor: pointer;
    }
  `]
})
export class DashboardComponent {
  latestActivities = [
    { name: 'Alice Martin', yob: 1985, action: 'Modification dossier (Notes)', status: 'Actif', statusClass: 'badge-active' },
    { name: 'Bernard Bernard', yob: 1970, action: 'Score POEM rempli', status: 'Actif', statusClass: 'badge-active' },
    { name: 'Céline Durant', yob: 1992, action: 'Invitation envoyée', status: 'Non complété', statusClass: 'badge-pending' },
    { name: 'David Lefebvre', yob: 1988, action: 'Refus de partage', status: 'Non partagé', statusClass: 'badge-unshared' }
  ];
}
