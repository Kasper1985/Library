import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventService, AuthService } from './../services';

import { IUser } from '../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public hamburgerState: 'open'|'close' = 'close';
  public loggedInUser: IUser;

  constructor(private eventService: EventService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loggedInUser = this.authService.loggedInUser;
    this.eventService.userLoggedInEvent.subscribe((user: IUser) => this.loggedInUser = user);
  }

  /**
   * Fires, whenever a hamburger for a side navigation will be clicked
   */
  hamburgerClick() {
    this.hamburgerState = this.hamburgerState === 'open' ? 'close' : 'open';
    this.eventService.hamburgerToggleEvent.emit(this.hamburgerState);
  }

  logIn() {
    this.router.navigate(['login']);
  }

  clickAvatar() {
    this.authService.logout();
  }
}
