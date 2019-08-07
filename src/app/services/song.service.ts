import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private notes: Array<string> = [
    "None", "None", "None", "None",
    "None", "None", "None", "None",
    "None", "None", "None", "None",
    "None", "None", "None", "None"
  ];

  constructor() { }

  editNote(note: string, index: number): void {
    this.notes[index] = note;
  }
}
