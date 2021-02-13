import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRouterModule} from './app-router.module';
import {FrontPageComponent} from './front-page/front-page.component';
import {AlbumsPageComponent} from './albums-page/albums-page.component';
import {AlbumsListService} from './services/albums-list.service';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorageService} from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    AlbumsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule
  ],
  providers: [
      AlbumsListService,
      LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
