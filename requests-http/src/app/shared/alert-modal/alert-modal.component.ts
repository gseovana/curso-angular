import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styles: [
  ]
})
export class AlertModalComponent {
  
  @Input() type = 'success';
  @Input() message: string;

  constructor(public bsModalRef: BsModalRef){}

  onClose(){
    this.bsModalRef.hide();
  }
}
