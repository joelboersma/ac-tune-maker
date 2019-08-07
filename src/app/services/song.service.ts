// This service handles the creation and playing of songs.

import { Injectable } from '@angular/core';
import { Time } from 'tone';
import { TranslationService } from './translation.service';

class Note {
  public frequency: string;
  public duration: number;
  public time: number;
}

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private sliderNotes: Array<string> = [
    "None", "None", "None", "None",
    "None", "None", "None", "None",
    "None", "None", "None", "None",
    "None", "None", "None", "None"
  ];

  constructor(private readonly translation: TranslationService) { }

  editNote(note: string, index: number): void {
    this.sliderNotes[index] = note;
  }

  play(): void {
    let song: Array<Note> = this.makeSong();
  }

  // Each note is format <frequency, duration>
  makeSong(): Array<Note> {
    let song: Array<Note>

    this.sliderNotes.forEach((sliderNote, index, sliderNotes) => {
      switch(sliderNote) {
        case "None": break;
        case "Hold": break;

        default: {
          // If random note, choose note
          let frequency: string;
          if (sliderNote == 'Random') {
            frequency = this.translation.translate(
              Math.floor(Math.random() * 13) + 2
            );
          } else {
            frequency = sliderNote;
          }

          // Set duration (check for subsequentholds)
          let duration: number = Time('8n')
          for (let i = index + 1; i < 16; i++) {
            if (sliderNotes[i] = "Hold") {
              duration += Time('8n');
            }
          }

          // Set time to start playing note
          let time: number = Time('8n') * (index + 1);

          // Add note to song
          song.push({frequency, duration, time});
        }
      }
    });

    return song;
  }
}
