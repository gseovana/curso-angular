import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngclass',
  templateUrl: './diretiva-ngclass.component.html',
  styleUrls: ['./diretiva-ngclass.component.css']
})
export class DiretivaNgclassComponent {
  bookmarked: boolean = false;

  onClick(){
    this.bookmarked = !this.bookmarked;
  }
}
