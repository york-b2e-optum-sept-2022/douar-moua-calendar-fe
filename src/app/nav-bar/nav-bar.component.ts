import { Component, } from '@angular/core';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private accountService: AccountService) {
  }


}
