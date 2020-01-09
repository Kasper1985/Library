import { Injectable, Output, EventEmitter } from '@angular/core';

import { IUser } from './../models';

@Injectable({ providedIn: 'root'})
export class EventService {
  @Output() userLoggedInEvent = new EventEmitter<IUser>();

  @Output() hamburgerToggleEvent = new EventEmitter<'open'|'close'>();

  @Output() pageOpen = new EventEmitter<string>();
}
