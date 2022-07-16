import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPhotoComponent } from './pages/add-photo/add-photo.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, title: 'IQraa Register' },
  {
    path: 'home',
    component: HomeComponent,
    title: 'IQraa Home',
  },
  { path: 'photos', component: PhotosComponent, title: 'IQraa Photos' },
  { path: 'addphoto', component: AddPhotoComponent },
  { path: '**', component: NotFoundComponent, title: 'Not Found Page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
