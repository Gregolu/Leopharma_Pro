import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="login-page">
      <!-- Zone gauche blanche centrée -->
      <div class="split-left">
        <div class="login-box">
          
          <div class="logo-area">
             <img src="/images/logo-manuderma.png" alt="Manu Derma" class="main-logo" />
          </div>

          <h2 class="auth-title" style="text-align: center; font-size: 24px; font-weight: 700; margin-bottom: 32px; color: #204131;">Demander un accès</h2>

          <form class="login-form">
            <div class="form-row">
              <div class="form-group">
                <label>Nom</label>
                <input type="text" placeholder="Dupont">
              </div>
              <div class="form-group">
                <label>Prénom</label>
                <input type="text" placeholder="Jean">
              </div>
            </div>

            <div class="form-group">
              <label>Adresse e-mail professionnelle</label>
              <input type="email" placeholder="medecin@hopital.fr">
            </div>
            
            <div class="form-group">
              <label>Numéro RPPS (Optionnel)</label>
              <input type="text" placeholder="Entrez votre numéro">
            </div>

            <button type="button" routerLink="/auth/login" class="btn-submit">Envoyer la demande</button>
          </form>

          <p class="signup-link">
            Déjà un compte ? <a routerLink="/auth/login">Se connecter</a>
          </p>

        </div>

        <div class="footer-simple">
          © 2026 Manu Derma - Tous droits réservés
        </div>
      </div>

      <!-- Zone droite verte décorative -->
      <div class="split-right">
        <div class="right-content">
          <p>Rejoignez la plateforme d'expertise médicale dermatologique.</p>
        </div>
        <img src="/images/hand-dashboard-visual.png" class="dashboard-visual" alt="Visuel Dashboard">
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      display: flex;
      min-height: 100vh;
      font-family: inherit;
    }

    .form-row {
      display: flex;
      gap: 16px;
    }
    .form-row .form-group {
      flex: 1;
    }

    /* GAUCHE : Blanc, avec contenu parfaitement centré */
    .split-left {
      flex: 1;
      background-color: white;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .login-box {
      margin: auto;
      width: 100%;
      max-width: 440px;
      padding: 40px;
    }

    .logo-area {
      text-align: center;
      margin-bottom: 20px;
    }
    .main-logo {
      max-width: 250px;
      height: auto;
    }

    .form-group {
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .form-group label {
      font-size: 14px;
      font-weight: 600;
      color: #374151;
    }
    .form-group input {
      padding: 14px 16px;
      border: 1px solid #d1d5db;
      border-radius: 12px;
      font-size: 15px;
      outline: none;
      transition: all 0.2s;
    }
    .form-group input:focus {
      border-color: #204131;
      box-shadow: 0 0 0 4px rgba(32, 65, 49, 0.1);
    }

    .btn-submit {
      width: 100%;
      padding: 16px;
      background-color: #204131;
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 16px;
    }
    .btn-submit:hover {
      background-color: #173224;
    }

    .signup-link {
      text-align: center;
      margin-top: 32px;
      color: #6b7280;
      font-size: 14px;
    }
    .signup-link a {
      color: #204131;
      font-weight: 600;
      text-decoration: none;
    }

    .footer-simple {
      position: absolute;
      bottom: 24px;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 13px;
      color: #9ca3af;
    }

    /* DROITE : Vert avec message */
    .split-right {
      flex: 1;
      background-color: #204131;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 60px 20px 0 20px;
      position: relative;
      overflow: hidden;
    }
    .right-content {
      text-align: center;
      color: white;
      max-width: 400px;
      margin-top: 80px;
      z-index: 10;
    }
    .right-content h2 {
      font-size: 40px;
      font-weight: 800;
      margin-bottom: 16px;
    }
    .right-content p {
      font-size: 18px;
      color: rgba(255,255,255,0.8);
      line-height: 1.5;
    }
    .dashboard-visual {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      max-width: 500px;
      height: auto;
      object-fit: contain;
      opacity: 0.1;
      pointer-events: none;
    }

    /* Responsive */
    @media (max-width: 900px) {
      .split-right { display: none; }
    }
  `]
})
export class RegisterComponent {}
