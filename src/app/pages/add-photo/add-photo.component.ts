import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css'],
})
export class AddPhotoComponent implements OnInit {
  constructor(private _photoService: PhotoService, private _router: Router) {}
  photoForm: FormGroup;

  photoFormSubmit() {
    console.log(this.photoForm);
    this._router.navigateByUrl('/photos');
    this._photoService.addPhoto({
      ...this.photoForm.value,
    });
  }

  ngOnInit(): void {
    this.photoForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      photoURL: new FormControl('', [
        Validators.required,
        Validators.pattern(/(https?:\/\/.*\.(?:jpg|jpeg|png))/i),
      ]),
    });
  }
}
