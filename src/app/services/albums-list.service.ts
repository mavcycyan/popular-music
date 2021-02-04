import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumsListService {

  constructor(private httpClient: HttpClient) {}

  getAlbums(params): Observable<any> {
      return this.httpClient.get(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${params.genre}&api_key=${environment.LAST_FM_ATOKEN}&format=json`);
  }
}
