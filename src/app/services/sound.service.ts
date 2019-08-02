import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }

  play(path: string): void {
    let sound = new Audio();
    sound.src = path;
    sound.load();
    sound.play();
  }
}
