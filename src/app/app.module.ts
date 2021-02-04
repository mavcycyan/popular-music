import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRouterModule} from './app-router.module';
import {FrontPageComponent} from './front-page/front-page.component';
import {AlbumsPageComponent} from './albums-page/albums-page.component';
import {AlbumsListService} from './services/albums-list.service';
import {HttpClientModule} from '@angular/common/http';

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
      AlbumsListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
