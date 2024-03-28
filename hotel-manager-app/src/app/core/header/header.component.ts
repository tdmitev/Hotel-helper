import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/types/menuItems';
import { MealItemService } from 'src/app/services/meal-item.service';
import { Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  formSubmitted = false;
  dropdownState = 'closed';
  rotateState = 'default';

  dishes: MenuItem[] = [];

  constructor(@Inject(MealItemService) private mealItemService: MealItemService, private userService: UserService, private router: Router) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {

  }

}