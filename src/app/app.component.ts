import { Component } from '@angular/core';
import { SongService } from './services/song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private playDisabled: boolean = false;

  constructor(private readonly song: SongService) {
    this.song.playing().subscribe(isPlaying => {
      this.playDisabled = isPlaying;
    });
  }
}
