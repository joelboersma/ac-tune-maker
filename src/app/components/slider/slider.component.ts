import { Component, OnInit } from '@angular/core';
import { Options, LabelType, CustomStepDefinition } from 'ng5-slider';

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

    translate: (value: number, label: LabelType): string => {
      return this.numberToNote(value);
    }
  };

  constructor() { }

  ngOnInit() {
  }

  numberToNote(num: number): string {
    return this.vals[num];
  }

  onUserChangeStart() {
    
  }

  onUserChange() {

  }
}