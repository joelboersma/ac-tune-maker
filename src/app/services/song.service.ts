// This service handles the creation and playing of songs.

import { Injectable } from '@angular/core';
import { Time, Synth, Transport } from 'tone';
import { TranslationService } from './translation.service';
import { BehaviorSubject, Observable } from 'rxjs';

class Note {
  readonly frequency: string;
  readonly duration: number;
  readonly time: number;
}

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private song: Array<Note>;
  private synth = new Synth().toMaster();
  private sliderNotes: Array<string> = [
    "None", "None", "None", "None",
    "None", "None", "None", "None",
    "None", "None", "None", "None",
    "None", "None", "None", "None"
  ];
  private active = new BehaviorSubject<boolean>(false);

  constructor(private readonly translation: TranslationService) {
    Transport.loop = false;
  }

  public editNote(note: string, index: number): void {
    this.sliderNotes[index] = note;
  }

  public play(): void {
    this.active.next(true); // Set to true
    this.song = this.makeSong();

    // Schedule each note
    this.song.forEach(note => {
      //console.log(note);
      Transport.schedule(
        (time) => {
          this.synth.triggerAttackRelease(note.frequency, note.duration, time);
          console.log(note);
        }, 
        note.time
      );
    });

    // Schedule end of song actions
    Transport.schedule(
      (time) => {
        Transport.stop(time);
        Transport.cancel(0);
        this.active.next(false);
        console.log("Done!")
      },
      Time("8n") * 17
    )

    Transport.start();
  }

  // Each note is format <frequency, duration>
  private makeSong(): Array<Note> {
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
          song.push({frequency, duration, time});
        }
      }
    });

    return song;
  }

  public playing(): Observable<boolean> {
    return this.active.asObservable();
  }
}
