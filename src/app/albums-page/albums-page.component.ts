import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AlbumsListService} from '../services/albums-list.service';
import {Subscription} from 'rxjs/index';
import {LocalStorageService} from '../services/local-storage.service';
import {Album, AlbumStorage} from '../interfaces';

@Component({
  selector: 'app-albums-page',
  templateUrl: './albums-page.component.html',
  styleUrls: ['./albums-page.component.css']
})
export class AlbumsPageComponent implements OnInit, OnDestroy, OnChanges {

  albumsBase: Album[];
  albums: Album[];

  liked = 0;

  searchQuery: string;

  genre: string;

  actRouteSub: Subscription;
  albumsSub: Subscription;

  constructor(
      private activatedRoute: ActivatedRoute,
      private albumListService: AlbumsListService,
      private localStorageService: LocalStorageService,
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
      console.log(event.target.valueOf());
      this.searchQuery = event.target.value;
  }

  getAlbumsList(): void{
      let genre = '';
      this.actRouteSub = this.activatedRoute.params.subscribe((params: Params) => {
          genre = params.genre;
      });

      this.albumsSub = this.albumListService.getAlbums({genre})
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

  toLs(id: string): void {
      this.liked = this.localStorageService.localStorageWorker(id, this.genre, this.albums, this.liked);
  }

  albumsModify(array: Array<Album>, storage: Array<AlbumStorage>): Array<Album> {
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

  ngOnChanges(): void {
      this.getAlbumsList();
  }

  ngOnInit(): void {
      this.getAlbumsList();
  }

  ngOnDestroy(): void {
      this.actRouteSub.unsubscribe();
      this.albumsSub.unsubscribe();
  }

}
