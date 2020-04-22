import {Component, OnInit} from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  clickedImage: string;
  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Accept': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    })
  };
  constructor(private camera: Camera, private httpClient: HttpClient) {}
  add() {
    const postData = {
      name: 'sebastian',
      lastname: 'nieto',
      email: 'j@gmail.com',
      file: {
        name: 'original.jpg',
        base64: 'asdas'
      }
    };
    this.httpClient.post('https://o7f63by8o0.execute-api.us-east-1.amazonaws.com/dev/users', postData, this.httpHeader)
        .subscribe(data => {
          console.log(data['_body']);
        }, error => {
          console.log(error);
        });
  }
  captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }
}
