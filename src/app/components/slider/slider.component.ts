import { Component, OnInit, Input} from '@angular/core';
import { Options, ChangeContext } from 'ng5-slider';
import { Synth } from 'tone';
import { SongService } from 'src/app/services/song.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() public sliderID: number;
  vals: Array<string> = [
    "None", "Hold", 
    'G', 'A', 'B', 'C', 'D', 'E', 'F', 
    'G', 'A', 'B', 'C', 'D', 'E', 
    '?'
  ];
  synth = new Synth().toMaster();

  disabled: boolean = false;

  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 15,
    animate: false,
    vertical: true,
    hideLimitLabels: true,
    readOnly: false,

    translate: (value: number): string => {
      return this.numberToLabel(value);
    }
  };

  constructor(
    private readonly song: SongService,
    private readonly translation: TranslationService
  ) { 
    this.song.playing().subscribe(isPlaying => {
      // this.options = Object.assign({}, this.options, {readOnly: isPlaying});

      this.disabled = isPlaying;
    });
  }

  ngOnInit() {
  }

  numberToLabel(num: number): string {
    return this.vals[num];
  }

  playNote(note: string): void {
    if (note.length === 2 && !this.disabled) {
      this.synth.triggerAttackRelease(note, '8n');
    }
  }

  onUserChangeStart(changeContext: ChangeContext): void {
    this.playNote(this.translation.translate(changeContext.value));
  }

  onUserChange(changeContext: ChangeContext): void {
    this.playNote(this.translation.translate(changeContext.value));
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    this.song.editNote(
      this.translation.translate(changeContext.value),
      this.sliderID
    )
  }
}