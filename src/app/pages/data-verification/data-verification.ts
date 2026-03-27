import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-data-verification',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="header-green">
        <h1 class="page-title">Vérification des données</h1>
        <div class="search-bar-container">
          <div class="search-input-wrapper">
            <input type="text" placeholder="Nom, Prénom, email, numéro de téléphone, Consultation..." class="search-input" />
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <button class="btn-search">Rechercher</button>
          <button class="btn-filter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
          </button>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID <span class="sort-icon">↕</span></th>
                <th>Catégorie <span class="sort-icon">↕</span></th>
                <th>Questionnaire <span class="sort-icon">↕</span></th>
                <th>Résultat <span class="sort-icon">↕</span></th>
                <th>Statut <span class="sort-icon">↕</span></th>
                <th>Revue par <span class="sort-icon">↕</span></th>
                <th>Revue le <span class="sort-icon">↕</span></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of verifications">
                <td class="col-id">{{ item.id }}</td>
                <td class="col-category">{{ item.category }}</td>
                <td class="col-questionnaire">{{ item.questionnaire }}</td>
                <td class="col-result">{{ item.result }}</td>
                <td class="col-status">{{ item.status }}</td>
                <td class="col-reviewer">{{ item.reviewedBy || '-' }}</td>
                <td class="col-date">{{ item.reviewedOn || '-' }}</td>
                <td class="col-action">
                  <button class="btn-view" routerLink="/patients">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="pagination">
            <button class="page-nav"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
            <button class="page-num active">1</button>
            <button class="page-num">2</button>
            <button class="page-num">3</button>
            <button class="page-num">4</button>
            <button class="page-num">5</button>
            <button class="page-nav"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #f7f9fc;
      min-height: 100vh;
      font-family: inherit;
    }

    .page-container {
      width: 100%;
    }

    .header-green {
      background-color: #204131;
      padding: 40px 40px 60px 40px;
      margin-top: -20px;
      color: white;
      text-align: center;
    }

    .page-title {
      font-size: 32px;
      font-weight: 800;
      margin: 0 0 30px 0;
      color: white;
    }

    .search-bar-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      max-width: 800px;
      margin: 0 auto;
    }

    .search-input-wrapper {
      position: relative;
      flex: 1;
    }

    .search-input {
      width: 100%;
      padding: 16px 20px 16px 44px;
      border-radius: 8px;
      border: none;
      font-size: 15px;
      color: #1a2233;
      outline: none;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    
    .search-input::placeholder {
      color: #6b7280;
    }

    .search-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
    }

    .btn-search {
      background-color: #1a2233;
      color: white;
      border: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      transition: background-color 0.2s;
      position: relative;
      z-index: 10;
    }

    .btn-search:hover {
      background-color: #111827;
    }

    .btn-filter {
      background-color: white;
      color: #1a2233;
      border: none;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      transition: background-color 0.2s;
    }

    .btn-filter:hover {
      background-color: #f3f4f6;
    }

    .content-wrapper {
      padding: 0 40px;
      margin-top: -30px;
    }

    .table-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      padding: 30px;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    .data-table th {
      color: #6b7280;
      font-size: 13px;
      font-weight: 600;
      padding: 16px;
      border-bottom: 2px solid #f3f4f6;
    }

    .sort-icon {
      display: inline-block;
      margin-left: 4px;
      font-size: 14px;
      cursor: pointer;
    }

    .data-table td {
      padding: 20px 16px;
      border-bottom: 1px solid #f3f4f6;
      font-size: 14px;
      color: #4b5563;
    }

    .data-table tr:hover td {
      background-color: #f9fafb;
    }

    .data-table tr:last-child td {
      border-bottom: none;
    }

    .col-id {
      color: #1a2233 !important;
      font-weight: 600;
    }

    .col-category {
      font-weight: 500;
    }
    
    .col-status {
      font-weight: 600;
      color: #374151;
    }

    .btn-view {
      background: #1a2233;
      color: white;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-view:hover {
      background: #204131;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin-top: 40px;
    }

    .page-nav {
      background: none;
      border: none;
      color: #1a2233;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 8px;
    }

    .page-num {
      background: none;
      border: none;
      color: #6b7280;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .page-num.active {
      color: #1a2233;
      font-weight: 800;
    }
    
    .page-num:hover:not(.active) {
      background: #f3f4f6;
    }
  `]
})
export class DataVerificationComponent {
  verifications = [
    { id: 'BRD001', category: 'Donnée manquante', questionnaire: 'Données personnelles', result: 'Numéro de téléphone manquant', status: 'Ouvert', reviewedBy: '', reviewedOn: '' },
    { id: 'BRD001', category: 'Donnée manquante', questionnaire: 'Questionnaire douleurs', result: 'Chirurgie 13/12/2023', status: 'Ouvert', reviewedBy: 'Angèle Lacroix', reviewedOn: '05/05/2025' },
    { id: 'BRD001', category: 'Donnée incohérente', questionnaire: 'Douleur dermatologique', result: 'Numéro de téléphone manquant', status: 'Ouvert', reviewedBy: 'Robert Dawson', reviewedOn: '27/04/2025' },
    { id: 'BRD001', category: 'Donnée manquante', questionnaire: 'Douleurs articulaires', result: 'Numéro de téléphone manquant', status: 'Ouvert', reviewedBy: '', reviewedOn: '' },
    { id: 'BRD001', category: 'Donnée manquante', questionnaire: 'Analyse des mains', result: 'Numéro de téléphone manquant', status: 'Ouvert', reviewedBy: '', reviewedOn: '' },
    { id: 'BRD001', category: 'Donnée manquante', questionnaire: 'Douleur dermatologique', result: 'Numéro de téléphone manquant', status: 'Ouvert', reviewedBy: 'Angèle Lacroix', reviewedOn: '04/04/2025' },
    { id: 'BRD001', category: 'Donnée manquante', questionnaire: 'Douleurs articulaires', result: 'Numéro de téléphone manquant', status: 'Ouvert', reviewedBy: 'Robert Dawson', reviewedOn: '23/03/2025' },
    { id: 'BRD001', category: 'Donnée manquante', questionnaire: 'Douleur dermatologique', result: 'Numéro de téléphone manquant', status: 'Ouvert', reviewedBy: 'Angèle Lacroix', reviewedOn: '10/03/2025' }
  ];
}
