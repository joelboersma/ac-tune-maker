import { Component, OnInit, Input} from '@angular/core';
import { Options, ChangeContext } from 'ng5-slider';
import { Synth } from 'tone';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() public sliderID: number;
  vals: Array<string> = ["None", "Hold", 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', '?'];
  synth = new Synth().toMaster();

  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 15,
    animate: false,
    vertical: true,
    hideLimitLabels: true,

    translate: (value: number): string => {
      return this.numberToLabel(value);
    }
  };

  constructor() { }

  ngOnInit() {
  }

  numberToLabel(num: number): string {
    return this.vals[num];
  }

  numberToNote(num: number): string {
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

  playNote(note: string): void {
    if (note.length === 2) {
      this.synth.triggerAttackRelease(note, '8n');
    }
  }

  onUserChangeStart(changeContext: ChangeContext): void {
    this.playNote(this.numberToNote(changeContext.value))
  }

  onUserChange(changeContext: ChangeContext): void {
    this.playNote(this.numberToNote(changeContext.value))
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    // Update note in song
  }
}