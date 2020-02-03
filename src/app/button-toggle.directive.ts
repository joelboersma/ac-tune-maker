import { Directive, ElementRef, Renderer2, Input, EventEmitter, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appButtonToggle]'
})
export class ButtonToggleDirective {
  @Input('appButtonToggle') enableButton: EventEmitter<boolean>;
  subscription: Subscription;

  constructor(private renderer: Renderer2, private el: ElementRef) { }
  
  ngOnInit() {
    this.subscription = this.enableButton.subscribe(value => {
      if (!value) {
        // Disable button
        this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
      }
      else {
        // Enable button
        this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
      }
    })
  }

  // @HostListener('click')
  // onClick() {
  //   this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
  // }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
