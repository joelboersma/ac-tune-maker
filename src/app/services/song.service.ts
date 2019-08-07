// This service handles the creation and playing of songs.

import { Injectable } from '@angular/core';
import { Time, Synth } from 'tone';
import { TranslationService } from './translation.service';

class Note {
  readonly frequency: string;
  readonly duration: number;
  readonly time: number;
}

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private synth = new Synth().toMaster();
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
    // song.forEach(note => {
    //   this.synth.triggerAttackRelease(note.frequency, note.duration, note.time);
    // });
  }

  // Each note is format <frequency, duration>
  makeSong(): Array<Note> {
    let song: Array<Note> = [];

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

          // Set duration (check for subsequent holds)
          let duration: number = Time('8n')
          for (let i = index + 1; i < 16; i++) {
            if (sliderNotes[i] == 'Hold') {
              duration += Time('8n');
            }
          }

          // Set time to start playing note
          let time: number = Time('8n') * (index);

          // Add note to song
          console.log(frequency, duration, time);
          song.push({frequency, duration, time});
        }
      }
    });

    return song;
  }
}
