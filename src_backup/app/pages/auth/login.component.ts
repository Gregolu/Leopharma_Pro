import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="auth-wrapper flex items-center justify-center">
      <div class="card auth-card flex-col items-center">
        <h1 class="brand-title">Sentinel Care <span>Pro</span></h1>
        <h2 class="auth-title">Connexion à l'espace médical</h2>
        
        <form class="auth-form flex-col gap-4" (ngSubmit)="login()">
          <div class="form-group flex-col gap-2">
            <label>Adresse e-mail professionnelle</label>
            <input type="email" placeholder="medecin@hopital.fr" required />
          </div>
          <div class="form-group flex-col gap-2">
            <label>Mot de passe</label>
            <input type="password" placeholder="••••••••" required />
          </div>
          
          <button type="submit" class="btn-primary w-full mt-4">Se connecter</button>
        </form>
        
        <p class="auth-footer">
          Nouveau professionnel ? <a routerLink="/auth/register">Créer un compte</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      min-height: 100vh;
      background: var(--bg-color);
    }
    .auth-card {
      width: 100%;
      max-width: 440px;
      padding: 48px;
      text-align: center;
    }
    .brand-title {
      color: var(--primary);
      font-size: 32px;
      margin-bottom: 8px;
      span { opacity: 0.8; font-weight: 400; }
    }
    .auth-title {
      font-size: 20px;
      color: var(--text-secondary);
      margin-bottom: 40px;
      font-weight: 400;
    }
    .auth-form {
      width: 100%;
      text-align: left;
    }
    .form-group label {
      font-family: 'Gilroy', sans-serif;
      font-weight: 700;
      color: var(--text-primary);
      font-size: 14px;
    }
    .form-group input {
      padding: 12px 16px;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-family: inherit;
      transition: border-color 0.2s;
    }
    .form-group input:focus {
      outline: none;
      border-color: var(--primary);
    }
    .w-full { width: 100%; }
    .mt-4 { margin-top: 24px; }
    .auth-footer {
      margin-top: 32px;
      font-size: 14px;
      color: var(--text-secondary);
    }
    .auth-footer a {
      color: var(--primary);
      font-weight: 700;
      text-decoration: none;
    }
  `]
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/dashboard']);
  }
}
