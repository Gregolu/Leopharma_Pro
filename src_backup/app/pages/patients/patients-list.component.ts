import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="patients-container flex-col gap-4">
      <div class="top-bar flex justify-between items-center">
        <h2 class="page-title">Dossiers patients</h2>
        
        <div class="actions flex gap-4">
          <div class="search-wrap">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" class="search-input" placeholder="Rechercher" />
          </div>

          <button class="btn-outline flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filtrer
          </button>

          <button class="btn-primary flex items-center gap-2">
            Nouveau dossier
          </button>
        </div>
      </div>

      <div class="table-card card">
        <table class="professional-table w-full">
          <thead>
            <tr>
              <th>Nom / Prénom</th>
              <th>Date de naissance</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Suivi thérapeutique</th>
              <th>Étude clinique</th>
              <th>Dernière modification</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let patient of patients">
              <td class="font-bold">{{ patient.name }}</td>
              <td>{{ patient.dob }}</td>
              <td class="text-secondary">{{ patient.email }}</td>
              <td class="text-secondary">{{ patient.phone }}</td>
              <td>{{ patient.therapy }}</td>
              <td>{{ patient.study || '-' }}</td>
              <td>{{ patient.lastMod }}</td>
              <td><span class="badge" [ngClass]="getBadgeClass(patient.status)">{{ patient.status }}</span></td>
              <td class="action-cell">
                <button class="icon-btn-gray" aria-label="Voir le dossier">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .patients-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .page-title {
      font-size: 28px;
      color: var(--primary);
      margin: 0;
    }

    .search-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input {
      width: 280px;
      padding: 10px 16px 10px 40px;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-family: inherit;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      color: var(--text-secondary);
    }
    
    .btn-outline {
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text-primary);
      padding: 10px 16px;
      border-radius: 8px;
      font-weight: 700;
      font-family: inherit;
      cursor: pointer;
    }

    .table-card {
      padding: 0;
      overflow-x: auto;
    }

    .professional-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    .professional-table th,
    .professional-table td {
      padding: 16px 24px;
      border-bottom: 1px solid var(--border);
    }

    .professional-table th {
      background-color: var(--bg-color);
      color: var(--text-secondary);
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .professional-table th:first-child { border-top-left-radius: 12px; }
    .professional-table th:last-child { border-top-right-radius: 12px; }

    .professional-table tr:last-child td {
      border-bottom: none;
    }
    
    .professional-table tbody tr:hover {
      background-color: var(--bg-color);
    }

    .text-secondary { color: var(--text-secondary); }
    .font-bold { font-weight: 700; color: var(--text-primary); }

    .badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
    }
    .badge-active { background: #e6f4ea; color: #1e8e3e; }
    .badge-inactive { background: #fce8e6; color: #d93025; }

    .action-cell {
      text-align: center;
    }

    .icon-btn-gray {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
    }
    
    .icon-btn-gray:hover {
      background: var(--border);
      color: var(--primary);
    }
  `]
})
export class PatientsListComponent {
  patients = [
    { name: 'Alice Martin', dob: '12/04/1985', email: 'alice.m@email.com', phone: '06 12 34 56 78', therapy: 'Alitretinoine', study: 'Etude A23', lastMod: '19/03/2026', status: 'Actif' },
    { name: 'Bernard Bernard', dob: '23/11/1970', email: 'b.bernard@email.com', phone: '06 98 76 54 32', therapy: 'Dupilumab', study: '', lastMod: '18/03/2026', status: 'Actif' },
    { name: 'Céline Durant', dob: '05/01/1992', email: 'c.durant@email.com', phone: '07 11 22 33 44', therapy: 'Ciclosporine', study: 'Etude X', lastMod: '10/03/2026', status: 'Inactif' },
    { name: 'David Lefebvre', dob: '14/09/1988', email: 'dl@email.com', phone: '06 55 44 33 22', therapy: 'Methotrexate', study: '', lastMod: '28/02/2026', status: 'Actif' }
  ];

  getBadgeClass(status: string) {
    return status === 'Actif' ? 'badge-active' : 'badge-inactive';
  }
}
