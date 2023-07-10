import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styles: [
  ]
})
export class UploadFileComponent {

  onChange(event: Event){
    console.log(event);
    const target = event.target as HTMLInputElement;
    const selectedFiles = <FileList>target.files;

    //document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    for(let i=0; i<selectedFiles.length;i++){
      fileNames.push(selectedFiles[i].name);
    }

    document.getElementById('customFile').innerHTML = fileNames.join(', ');

    selectedFiles
  }
}
