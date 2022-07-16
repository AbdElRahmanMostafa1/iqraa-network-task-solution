import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {
  constructor(private _photoService: PhotoService, private _router: Router) {}
  photosData = [];

  navigateToAddPhoto() {
    this._router.navigateByUrl('/addphoto');
  }

  deletePhotoHandler(photoData: any) {
    this._photoService.deletePhoto(photoData);
  }

  ngOnInit(): void {
    this._photoService.getPhotos().subscribe({
      next: (res: any) => {
        this.photosData = res.map((e) => ({
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        }));
        console.log(this.photosData);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
