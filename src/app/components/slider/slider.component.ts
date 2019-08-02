import { Component, OnInit } from '@angular/core';
import { Options, ChangeContext } from 'ng5-slider';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  vals: Array<string> = ["None", "Hold", 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', '?'];

  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 15,
    animate: false,
    vertical: true,
    hideLimitLabels: true,

    translate: (value: number): string => {
      return this.numberToNote(value);
    }
  };

  constructor(private readonly soundService: SoundService) { }

  ngOnInit() {
  }

  numberToNote(num: number): string {
    return this.vals[num];
  }

  playNote(): void {
    if (this.value < 2) {
      return;
    }

    let soundNum = this.value.toString();
    if (this.value <= 9) {
      soundNum = "0" + soundNum;
    }

    this.soundService.play(`../../../assets/sounds/${soundNum}.mp3`);
  }
}
