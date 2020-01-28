import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { SliderComponent } from './components/slider/slider.component';
import { ButtonToggleDirective } from './button-toggle.directive';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    ButtonToggleDirective
  ],
  imports: [
    BrowserModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
