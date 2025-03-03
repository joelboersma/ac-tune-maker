import { Directive, ElementRef, Renderer2, Input, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appButtonToggle]'
})
export class ButtonToggleDirective {
  @Input('appButtonToggle') enableButton: EventEmitter<boolean>;
  subscription: Subscription;

  constructor(private renderer: Renderer2, private el: ElementRef) { }
  
  ngOnInit() {
    this.subscription = this.enableButton.subscribe(enable => {
      if (enable) {
        this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
      }
      else {
        this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
      }
    })
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
