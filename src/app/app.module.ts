import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event-list/event-list.component';
import { CreateEventComponent } from './create-event/create-event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    NavBarComponent,
    EventComponent,
    EventListComponent,
    CreateEventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
