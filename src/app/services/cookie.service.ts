import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({providedIn: 'root'})
export class CookieService {
  @Output() CookieExpiredEmitter: EventEmitter<string> = new EventEmitter();

  constructor() {}

  /**
   * Sets cookie im browser.
   * @param name Name of the cookie to set.
   * @param value Value of the cookie to set.
   * @param validityDuration Validity duration of the cookie im second. By default 1 hour.
   */
  setCookie(name: string, value: string, validityDuration: number = 3600, watchCookie?: boolean) {
    const date = new Date();

    // set expire date for a cookie
    date.setTime(date.getTime() + validityDuration * 1000);

    // set cookie
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    if (watchCookie) {
      setTimeout(this.checkCookie.bind(this, name), validityDuration * 1000);
    }
  }

  /**
   * Gets the value of the cookie.
   * @param name Name of the cookie to get.
   */
  getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  /**
   * Removes the cookie from browser.
   * @param name Name of the cookie to be removed.
   */
  deleteCookie(name: string) {
    const date = new Date();

    // set expire time in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 3600 * 1000));

    // set cookie
    document.cookie = `${name}=; expires=${date.toUTCString()}; path=/`;
  }

  private checkCookie(name: string) {
    if (!this.getCookie(name)) {
      this.CookieExpiredEmitter.emit(name);
    }
  }
}
