import { Component, EventEmitter } from '@angular/core';
import { SongService } from './services/song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private enableButton = new EventEmitter<boolean>();

  constructor(private readonly song: SongService) {
    this.song.playing().subscribe(isPlaying => {
      if (!isPlaying) {
        this.enableButton.emit(true);
      }
      else {
        this.enableButton.emit(false);
      }
    });
  }
}
