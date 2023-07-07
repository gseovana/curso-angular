import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styles: [
  ]
})
export class ConfirmModalComponent {

  @Input() title: string;
  @Input() msg: string;
  @Input() cancelText = 'Cancelar';
  @Input() confirmText = 'Sim';

  confirmResult: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef){}

  ngOnInit(){
    this.confirmResult = new Subject();
  }

  onConfirm(){
    this.confirmAndClose(true);
  }

  onClose(){
    this.confirmAndClose(false);
  }

  private confirmAndClose(value: boolean){
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }

 
}
