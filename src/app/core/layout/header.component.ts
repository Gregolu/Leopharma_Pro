import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-left">
        <!-- Logo -->
        <img src="/images/logo-blanc.png" class="logo" alt="SentinelCare">
        
        <!-- Navigation alignée comme sur le schéma -->
        <nav class="header-nav">
          <a routerLink="/dashboard" routerLinkActive="active" class="home-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l8 6v12h-5v-7h-6v7H4V9z"/></svg>
          </a>
          <a routerLink="/patients" routerLinkActive="active" class="nav-item">Dossiers patients</a>
          <div class="nav-item dropdown-container">
            <div class="dropdown-trigger">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>
              Études cliniques
            </div>
            <div class="header-dropdown">
              <a routerLink="/analyse">Analyse</a>
              <a routerLink="/data-verification">Vérifications des data</a>
              <a routerLink="/exportation">Export</a>
            </div>
          </div>
        </nav>
      </div>

      <div class="header-right">
        <div class="hospital-selector-container">
          <div class="select-box" (click)="toggleHospitalMenu()">
            {{ selectedHospital }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>
          </div>
          <div class="hospital-dropdown" *ngIf="isHospitalMenuOpen">
            <div class="hospital-item" *ngFor="let hopital of hospitals" (click)="selectHospital(hopital)">
              {{ hopital }}
            </div>
          </div>
        </div>
        
        <div class="notification">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <div class="dot"></div>
        </div>

        <div class="user-profile-container">
          <div class="user-profile" (click)="toggleMenu()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>
          </div>
          
          <div class="profile-dropdown" *ngIf="isMenuOpen">
            <div class="dropdown-header">
              <span class="user-name">Dr. Jean Dupont</span>
              <span class="user-role">Professionnel de santé</span>
            </div>
            <div class="dropdown-links">
              <a routerLink="/profile" class="dropdown-item" (click)="toggleMenu()">Mon Profil</a>
              <a routerLink="/settings" class="dropdown-item" (click)="toggleMenu()">Paramètres</a>
              <div class="dropdown-item lang-switch">
                <span>Langue</span>
                <span class="lang-badge">FR</span>
              </div>
            </div>
            <div class="dropdown-footer">
              <a href="/auth/login" class="dropdown-item text-danger">Se déconnecter</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: #204131; /* Structure avec la couleur demandée précédemment */
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;
      color: white;
      font-family: inherit;
      position: relative;
      z-index: 1000;
    }
    .header-left { display: flex; align-items: center; gap: 40px; }
    .logo { height: 32px; width: auto; margin: 0; }
    
    .header-nav { display: flex; align-items: center; gap: 24px; }
    .home-icon {
      background: white;
      color: #204131;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .nav-item {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      padding: 20px 0; /* padding plus grand pour le dropdown hover */
    }
    .nav-item.active, .nav-item:hover {
      color: white;
    }
    .active {
      border-bottom: 2px solid white;
    }
    
    .dropdown-container {
      position: relative;
    }
    .dropdown-trigger {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .header-dropdown {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background-color: white;
      min-width: 220px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-radius: 8px;
      padding: 8px 0;
      z-index: 200;
    }
    .dropdown-container:hover .header-dropdown {
      display: block;
    }
    .header-dropdown a {
      display: block;
      color: #1a2233;
      padding: 10px 20px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
    }
    .header-dropdown a:hover {
      background-color: #f3f4f6;
      color: #204131;
    }
    
    .header-right { display: flex; align-items: center; gap: 20px; position: relative; }
    .hospital-selector-container {
      position: relative;
    }
    .select-box {
      background: white;
      color: #1a2233;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .hospital-dropdown {
      position: absolute;
      top: 45px;
      right: 0;
      width: 200px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      border: 1px solid #eee;
      color: #333;
      z-index: 300;
      overflow: hidden;
    }
    .hospital-item {
      padding: 12px 16px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.2s;
    }
    .hospital-item:hover {
      background-color: #f3f4f6;
      color: #204131;
    }
    .notification { position: relative; margin: 0 10px; cursor: pointer; }
    .dot {
      position: absolute;
      top: 0; right: 0;
      width: 8px; height: 8px;
      background: #ff4757;
      border-radius: 50%;
      border: 2px solid #204131;
    }
    .user-profile-container {
      position: relative;
    }
    .user-profile {
      background: white;
      color: #204131;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    .profile-dropdown {
      position: absolute;
      top: 50px;
      right: 0;
      width: 240px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      border: 1px solid #eee;
      color: #333;
      z-index: 100;
      overflow: hidden;
    }
    .dropdown-header {
      padding: 16px;
      border-bottom: 1px solid #eee;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .user-name { font-weight: 700; font-size: 15px; color: #1a2233; }
    .user-role { font-size: 13px; color: #666; }
    
    .dropdown-links {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
    .dropdown-item {
      display: block;
      padding: 10px 16px;
      color: #333;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.2s;
    }
    .dropdown-item:hover { background: #f9fafb; color: #204131; }
    
    .lang-switch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    .lang-badge {
      background: #e3fcec;
      color: #204131;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 700;
    }
    
    .dropdown-footer { padding: 8px 0; }
    .text-danger { color: #e11d48; }
    .text-danger:hover { background: #fff1f2; color: #be123c; }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;
  isHospitalMenuOpen = false;
  hospitals = ['Bordeaux Sud', 'CHU de Toulouse', 'Hôpital Saint-André', 'Polyclinique Bordeaux Nord'];
  selectedHospital = 'Bordeaux Sud';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) this.isHospitalMenuOpen = false;
  }

  toggleHospitalMenu() {
    this.isHospitalMenuOpen = !this.isHospitalMenuOpen;
    if (this.isHospitalMenuOpen) this.isMenuOpen = false;
  }

  selectHospital(hopital: string) {
    this.selectedHospital = hopital;
    this.isHospitalMenuOpen = false;
  }
}
