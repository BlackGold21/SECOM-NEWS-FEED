import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'SECOM NEWS FEED';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
