import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/types/menuItems';
import { MealItemService } from 'src/app/services/meal-item.service';
import { Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  dropdownState = 'closed';
  rotateState = 'default';

  dishes: MenuItem[] = [];

  constructor(@Inject(MealItemService) private mealItemService: MealItemService, private userService: UserService, private router: Router) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
        this.router.navigate(['/']); // Пренасочване след успешно излизане
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }

  ngOnInit(): void {

    const mealEventId = '65fab6da042d6284bb31009f';
    this.mealItemService.getDishes(mealEventId).subscribe(dishes => {
      this.dishes = dishes;
    });
  }

}