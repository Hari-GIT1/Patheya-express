import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = true;
  restaurantName = '';
  user =JSON.parse(localStorage.getItem('user') || '{}');

constructor(
  private router: Router,
  private AuthService: AuthService
) {}
ngOnInit(): void {

  const user = this.AuthService.getUser();

  console.log(user);

  this.restaurantName =
    user.restaurantName || 'Restaurant';

}

logout() {

  localStorage.removeItem('token');

  localStorage.removeItem('user');

  this.router.navigate(['/']);

}

}
