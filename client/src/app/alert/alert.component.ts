import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { transition, trigger, style, animate } from '@angular/animations';

import { EventService } from '../services';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('slideInOutUp', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms 0s ease-out')
      ]),
      transition(':leave', [
        animate('300ms 0s ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit {
  private ALERT_DURATION = 5000;
  alert: { type: 'info'|'warning'|'error'|'question', message: string };
  type: 'info'|'warning'|'error'|'question';
  message: string;

  @Output() result = new EventEmitter<any>();

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.alert.subscribe((alert: { type: 'info'|'warning'|'error'|'question', message: string }) => this.showAlert(alert));
  }

  showAlert(alert: { type: 'info'|'warning'|'error'|'question', message: string }) {
    this.alert = alert;
    setTimeout(() => this.alert = undefined, this.ALERT_DURATION);
  }
}
