import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      
      <main class="content-area">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer Structuré -->
      <footer class="app-footer">
        <div class="footer-center-logo">
           <img src="assets/ManuDerma.PNG" alt="ManuDerma" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />
        </div>
        <div class="footer-links">
          <span>Conditions générales</span>
          <span>Contact</span>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #f7f9fc;
      font-family: inherit;
    }

    .content-area {
      flex: 1;
      width: 100%;
    }

    /* Structure Footer */
    .app-footer {
      background-color: #204131;
      color: white;
      padding: 60px 20px 30px;
      position: relative;
      text-align: center;
      margin-top: 60px;
    }
    .footer-center-logo {
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 80px;
      background: white;
      color: #204131;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 8px solid #204131;
    }
    .footer-links {
      display: flex;
      justify-content: center;
      gap: 40px;
      font-size: 14px;
      opacity: 0.8;
    }
  `]
})
export class MainLayoutComponent {}
