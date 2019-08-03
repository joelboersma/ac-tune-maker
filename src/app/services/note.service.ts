import { Injectable } from '@angular/core';
import { MidiWriter } from 'midi-writer-js';
import { Player, Track } from 'midi-player-js';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private track = new MidiWriter.Track();

  constructor() {
    this.track.addEvent(new MidiWriter.ProgramChangeEvent({instrument : 1}));
  }

  test() {
    let note = new MidiWriter.NoteEvent({pitch:['C4', 'D4', 'E4'], duration: '4'});
    this.track.addEvent(note);
    //console.log(this.track);
  }
}
