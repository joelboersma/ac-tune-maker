import { Component } from '@angular/core';
import { SongService } from './services/song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ac-tune-maker';

  constructor(private readonly song: SongService) {}
}
