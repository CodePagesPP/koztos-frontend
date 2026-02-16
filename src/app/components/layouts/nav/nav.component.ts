import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  activeSubmenu: string | null = null;
  isMenuOpen = window.innerWidth > 768;

  constructor(
    private authService: AuthService
  ) {}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSubmenu(menu: string) {
    this.activeSubmenu = this.activeSubmenu === menu ? null : menu;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  handleNavLinkClick() {
    if (window.innerWidth <= 768) {
      this.closeMenu();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
