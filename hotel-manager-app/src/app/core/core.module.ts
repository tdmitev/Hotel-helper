import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ChatComponent
  ]
})
export class CoreModule { }
