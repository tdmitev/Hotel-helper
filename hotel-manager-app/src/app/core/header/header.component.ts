import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/types/menuItems';
import { MealItemService } from 'src/app/services/meal-item.service';
import { Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

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

  constructor(@Inject(MealItemService) private mealItemService: MealItemService, private userService: UserService, private router: Router, private messageService: MessageService) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  navigateToCreateMealEvent() {
    this.router.navigate(['/meal-events/create-meal-event']);
  }

  logout(): void {
    this.userService.logout();
    this.messageService.setMessage('Logged out successfully!');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {

  }

}