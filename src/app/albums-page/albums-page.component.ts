import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AlbumsListService} from '../services/albums-list.service';
import {Observable, Subscription} from 'rxjs/index';

@Component({
  selector: 'app-albums-page',
  templateUrl: './albums-page.component.html',
  styleUrls: ['./albums-page.component.css']
})
export class AlbumsPageComponent implements OnInit, OnDestroy {

  albumsBase: any;
  albums: any;

  liked = 0;

  searchQuery: string;

  genre: string;

  actRouteSub: Subscription;
  albumsSub: Subscription;

  constructor(
      private activatedRoute: ActivatedRoute,
      private albumListService: AlbumsListService
  ) { }

  filterItems(query): void {
      if (query && query !== '') {
          this.albums = this.albumsBase.filter((el) => {
              return el.name.toLowerCase().indexOf(query.toLowerCase()) + 1;
          });
      } else {
          this.albums = this.albumsBase;
      }
  }

  writeToSearch(event: any): void {
      this.searchQuery = event.target.value;
  }

  async getAlbumsList(): Promise<any> {
      let genre = '';
      this.actRouteSub = await this.activatedRoute.params.subscribe((params: Params) => {
          genre = params.genre;
      });

      this.albumsSub = await this.albumListService.getAlbums({genre})
          .subscribe(albums => {
              this.genre = genre;

              let lStor = JSON.parse(localStorage.getItem('albums_liked'));
              if (lStor && lStor.length > 0) {
                  lStor = lStor.filter(album => {
                      if (album.genre === this.genre) {
                          return album;
                      }
                  });
              }

              this.liked = (lStor) ? lStor.length : 0;

              this.albums = this.albumsModify(albums.albums.album, lStor);
              this.albumsBase = this.albumsModify(albums.albums.album, lStor);
          });
  }

  toLs(id: number): void {
      let lStor = null;
      if (localStorage.getItem('albums_liked')) {
          lStor = JSON.parse(localStorage.getItem('albums_liked'));
          let albumIndex = 0;
          const isAlbum = lStor.find((album, index) => {
              if (album.id === id && album.genre === this.genre) {
                  albumIndex = index;
                  return album;
              }
          });

          if (isAlbum) {
              this.albums.find((album, index) => {
                 if (album.id === id) {
                     this.albums[index].isLiked = false;
                 }
              });
              this.liked--;
              lStor.splice(albumIndex, 1);
          } else {
              this.albums.find((album, index) => {
                  if (album.id === id) {
                      this.albums[index].isLiked = true;
                  }
              });
              this.liked++;
              lStor.push({id, genre: this.genre});
          }
      } else {
          this.albums.find((album, index) => {
              if (album.id === id) {
                  this.albums[index].isLiked = true;
              }
          });
          this.liked++;
          lStor = [{id, genre: this.genre}];
      }
      localStorage.setItem('albums_liked', JSON.stringify(lStor));
  }

  albumsModify(array: Array<any>, storage: Array<any>): Array<any> {
      return array.map((el, i) => {
          el.id = el.mbid + '-' + i + '-' + this.genre;
          if (storage) {
              if (
                  storage.find((like) => {
                      if (like.id === el.id && like.genre === this.genre) {
                          return like;
                      }
                  })
              ) {
                  el.isLiked = true;
              } else {
                  el.isLiked = false;
              }
          } else {
              el.isLiked = false;
          }
          return el;
      });
  }

  ngOnInit(): void {
      this.getAlbumsList();
  }

  ngOnDestroy(): void {
      this.actRouteSub.unsubscribe();
      this.albumsSub.unsubscribe();
  }

}
