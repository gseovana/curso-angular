import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styles: [
  ]
})
export class UploadFileComponent {

  files: Set<File>;
  progress = 0;

  constructor(private service: FileService){}

  onChange(event: Event){
    console.log(event);
    const target = event.target as HTMLInputElement;
    const selectedFiles = <FileList>target.files;

    //document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for(let i=0; i<selectedFiles.length;i++){
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('customFile').innerHTML = fileNames.join(', ');
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.service.upload(this.files, '/api/upload')
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload concluído!'));

        // .subscribe((event: HttpEvent<Object>) => {
        //   //console.log(event)
        //   if(event.type === HttpEventType.Response){
        //     console.log('Upload concluído!');
        //   }
        //   /*else if(event.type == HttpEventType.UploadProgress){
        //     const percentDone = Math.round((event.loaded * 100) / event.total);
        //     this.progress = percentDone;
        //   }*/
        // });
    }
  }

  onDownloadExcel(){
    this.service.download('/api'+'/downloadExcel')
      .subscribe((res: any) => {
        const file = new Blob([res], {
          type: res.type
        });

        const blob = window.URL.createObjectURL(file);

        const link = document.createElement('a');
        link.href = blob;
        link.download = 'report.xlsx';

        link.click();

        window.URL.revokeObjectURL(blob);
        link.remove();
      });
  }

  onDownloadPDF(){

  }
}
