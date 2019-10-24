import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ParseapiService } from '../parseapi.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
 
  constructor(private http: HttpClient,public ps: ParseapiService) { 
    ps.init();
  }

  ngOnInit() {
  }
  



 
fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      console.log(this.fileData);
      this.preview();
}
 
preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
}
 
onSubmit() {
  const formData = new FormData();
  formData.append('files', this.fileData);
   
  this.fileUploadProgress = '0%';

  this.http.post('https://parseapi.back4app.com/classes/file', formData, {
    reportProgress: true,
    observe: 'events'   
  })
  .subscribe(events => {
    if(events.type === HttpEventType.UploadProgress) {
      this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
      console.log(this.fileUploadProgress);
    } else if(events.type === HttpEventType.Response) {
      this.fileUploadProgress = '';
      console.log(events.body);          
      alert('SUCCESS !!');
    }
       
  }) 
}

}
