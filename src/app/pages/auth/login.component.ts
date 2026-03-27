import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
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

          <form class="login-form">
            <div class="form-group">
              <label>Nom d'utilisateur</label>
              <input type="text" placeholder="Entrez votre nom d'utilisateur">
            </div>
            
            <div class="form-group">
              <label>Mot de passe</label>
              <input type="password" placeholder="Entrez votre mot de passe">
            </div>

            <div class="form-options">
              <label class="remember">
                <input type="checkbox">
                <span>Se souvenir de moi</span>
              </label>
              <a href="#" class="forgot">Mot de passe oublié ?</a>
            </div>

            <button type="button" routerLink="/dashboard" class="btn-submit">Se connecter</button>
          </form>

          <p class="signup-link">
            Pas encore de compte ? <a href="#">Demander un accès</a>
          </p>

        </div>

        <div class="footer-simple">
          © 2026 Manu Derma - Tous droits réservés
        </div>
      </div>

      <!-- Zone droite verte décorative -->
      <div class="split-right">
        <div class="right-content">
          
          <p>L'expertise médicale dermatologique au service de vos patients.</p>
        </div>
        <img src="/images/hand-auth.png" class="auth-visual" alt="Visuel Auth">
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      display: flex;
      min-height: 100vh;
      font-family: inherit;
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
      margin: auto; /* Centre verticalement et horizontalement grâce au flex de split-left */
      width: 100%;
      max-width: 440px;
      padding: 40px;
    }

    .logo-area {
      text-align: center;
      margin-bottom: 40px;
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

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      font-size: 14px;
    }
    .remember {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #4b5563;
      cursor: pointer;
    }
    .forgot {
      color: #204131;
      text-decoration: none;
      font-weight: 600;
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
      font-size: 28px;
      font-weight: 700;
      color: rgba(255,255,255,0.9);
      line-height: 1.4;
    }
    .auth-visual {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 70%;
      max-width: 500px;
      height: auto;
      object-fit: contain;
      pointer-events: none;
    }

    /* Responsive */
    @media (max-width: 900px) {
      .split-right { display: none; }
    }
  `]
})
export class LoginComponent {}
