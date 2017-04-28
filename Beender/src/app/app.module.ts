import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { UploadPhotosComponent } from './upload-photos/upload-photos.component';
import {ImageUploadModule } from '../../node_modules/angular2-image-upload/';
import { TimelineComponent } from './timeline/timeline.component';
import { DayComponent } from './day/day.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component'
import { UserService } from "app/user.service";
import { AgmCoreModule, SebmGoogleMapMarker, SebmGoogleMap } from 'angular2-google-maps/core';

const appRoutes: Routes = [
  { path: 'timeline/:user_id/:timeline_id', component: TimelineComponent },  
  {
    path: 'upload',
    component: HomeComponent,
    data: { title: 'Upload' }
  },
  { path: '',
    redirectTo: '/upload',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UploadPhotosComponent,
    TimelineComponent,
    DayComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ImageUploadModule.forRoot(),
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDc8UxD7glWG3sVr-Dopt_RRxhcesdAx-0'
    }),
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
