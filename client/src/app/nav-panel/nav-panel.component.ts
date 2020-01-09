import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TooltipDirective } from '@progress/kendo-angular-tooltip';

import { INavItem } from '../models';

import { EventService } from './../services';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent implements OnInit {
  @Input() navState: 'open'|'close' = 'close';

  @ViewChild(TooltipDirective, { static: false }) public toolTipDirective: TooltipDirective;

  navItems: INavItem[] = [
    { id: 'home', active: false, title: 'NAV.HOME', link: 'home' },
    { id: 'catalogue', active: false, title: 'NAV.CATALOGUE', link: 'catalogue' },
    { id: 'booking', active: false, title: 'NAV.BOOKING', link: '' },
    { id: 'lending', active: false, title: 'NAV.LENDING', link: '' }
  ];
  // menuState: 'expanded' | 'collapsed' = 'collapsed';

  constructor(private router: Router,
              private eventService: EventService) {
    this.eventService.hamburgerToggleEvent.subscribe((state: 'open'|'close') => this.navState = state);
    this.eventService.pageOpen.subscribe((id: string) => this.selectNavItem(id));
  }

  ngOnInit() {
  }

  clickNavItem(navItem: INavItem) {
    this.router.navigate([navItem.link]);
  }

  selectNavItem(id: string) {
    const activeNavItem = this.navItems.find(item => item.active);
    if (activeNavItem && activeNavItem.id !== id) {
      activeNavItem.active = false;
    }

    const navItem = this.navItems.find(item => item.id === id);
    if (navItem) {
      navItem.active = true;
    }
  }

  // onToggleMenu(toggler: HTMLInputElement) {
  //   this.menuState = toggler.checked ? 'expanded' : 'collapsed';
  //   this.toolTipDirective.showOn = this.menuState === 'collapsed' ? 'hover' : 'none';
  // }
}
