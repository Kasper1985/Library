import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class EventService {
  @Output() hamburgerToggleEvent = new EventEmitter<'open'|'close'>();
}
