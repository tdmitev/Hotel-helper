import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { filter } from 'rxjs/operators';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hotel-manager-app';

  isFaded: boolean = false;
  message: string | null = null;

  constructor(private router: Router, private messageService: MessageService) {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isFaded = event.urlAfterRedirects !== '/';
      }
    });
  }

  ngOnInit(): void {
    initFlowbite();

    this.messageService.getMessage().subscribe((message) => {
      this.message = message;
    });
    
  }

}

