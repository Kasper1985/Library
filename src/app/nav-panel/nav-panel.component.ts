import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { INavItem } from '../models';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent implements OnInit {
  @ViewChild(TooltipDirective) public toolTipDirective: TooltipDirective;

  navItems: INavItem[] = [
    { id: 0, title: 'NAVIGATION.CATALOGUE', icon: '', link: ''},
    { id: 1, title: 'NAVIGATION.BOOKING', icon: '', link: ''},
    { id: 2, title: 'NAVIGATION.LENDING', icon: '', link: ''}
  ];
  activeItemId = 0;
  menuState: 'expanded' | 'collapsed' = 'collapsed';

  constructor() { }

  ngOnInit() {
  }

  onToggleMenu(toggler: HTMLInputElement) {
    this.menuState = toggler.checked ? 'expanded' : 'collapsed';
    this.toolTipDirective.showOn = this.menuState === 'collapsed' ? 'hover' : 'none';
  }
}
