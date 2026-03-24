import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="header">
      <div class="header-left">
        <h1 class="logo">Sentinel Care <span>Pro</span></h1>
      </div>

      <nav class="header-center">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">Home</a>
        <a routerLink="/patients" routerLinkActive="active" class="nav-item">Dossiers patients</a>
        <a routerLink="/etudes" routerLinkActive="active" class="nav-item">Études cliniques</a>
        <a routerLink="/reseau" routerLinkActive="active" class="nav-item">Réseau partenaire</a>
      </nav>

      <div class="header-right">
        <select class="facility-select">
          <option>Bordeaux Nord</option>
          <option>Bordeaux Sud</option>
        </select>
        
        <button class="icon-btn" aria-label="Notifications">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>

        <div class="profile-dropdown">
          <button class="icon-btn profile-btn" (click)="toggleMenu()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          
          <div class="dropdown-menu" *ngIf="menuOpen">
            <div class="dropdown-item user-info">Dr. Dupont</div>
            <hr>
            <a href="#" class="dropdown-item">Mon profil</a>
            <a href="#" class="dropdown-item">Paramètres</a>
            <a routerLink="/auth/login" class="dropdown-item text-red">Déconnexion</a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--primary);
      color: var(--surface);
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      box-shadow: var(--shadow);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .logo {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      color: var(--surface);
    }
    .logo span {
      font-weight: 400;
      opacity: 0.8;
    }

    .header-center {
      display: flex;
      gap: 32px;
    }

    .nav-item {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-family: 'Gilroy', sans-serif;
      font-size: 16px;
      transition: color 0.2s;
      padding-bottom: 4px;

      &:hover, &.active {
        color: var(--surface);
        font-weight: 700;
        border-bottom: 2px solid var(--surface);
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .facility-select {
      background: transparent;
      color: var(--surface);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      padding: 8px 12px;
      font-family: inherit;
    }
    
    .facility-select option {
      color: var(--text-primary);
    }

    .icon-btn {
      background: transparent;
      border: none;
      color: var(--surface);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .profile-dropdown {
      position: relative;
    }
    
    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 8px;
      background: var(--surface);
      color: var(--text-primary);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow);
      min-width: 200px;
      overflow: hidden;
    }
    
    .dropdown-item {
      display: block;
      padding: 12px 16px;
      text-decoration: none;
      color: var(--text-primary);
      transition: background 0.2s;
    }
    
    .dropdown-item:hover {
      background: var(--bg-color);
    }
    
    .user-info {
      font-weight: 700;
      background: var(--bg-color);
    }
    
    .text-red { color: #e11d48; }
  `]
})
export class HeaderComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
