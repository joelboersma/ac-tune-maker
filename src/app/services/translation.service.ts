// Translates an integer value to a note frequency

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  translate(num: number): string {
    switch(num) {
      case 0:  return 'None';
      case 1:  return 'Hold';
      case 2:  return 'G4';
      case 3:  return 'A4';
      case 4:  return 'B4';
      case 5:  return 'C5';
      case 6:  return 'D5';
      case 7:  return 'E5';
      case 8:  return 'F5';
      case 9:  return 'G5';
      case 10: return 'A5';
      case 11: return 'B5';
      case 12: return 'C6';
      case 13: return 'D6';
      case 14: return 'E6';
      case 15: return 'Random';
      default: return 'Error';
    }
  }
}
