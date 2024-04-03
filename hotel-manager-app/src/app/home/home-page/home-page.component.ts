import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/animations';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [fadeIn]  
})
export class HomePageComponent implements OnInit{

  constructor(private userService: UserService) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {

  }

}
