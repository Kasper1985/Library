import { Component, OnInit } from '@angular/core';

import { EventService } from './../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.pageOpen.emit('home');
  }

}
