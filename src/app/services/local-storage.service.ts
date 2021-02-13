import { Injectable } from '@angular/core';
import {Album} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    localStorageWorker(id: string, genre: string, albums: Album[], liked: number): number {
        let lStor = null;
        if (localStorage.getItem('albums_liked')) {
            lStor = JSON.parse(localStorage.getItem('albums_liked'));
            let albumIndex = 0;
            const isAlbum = lStor.find((album, index) => {
                if (album.id === id && album.genre === genre) {
                    albumIndex = index;
                    return album;
                }
            });

            if (isAlbum) {
                albums.find((album, index) => {
                    if (album.id === id) {
                        albums[index].isLiked = false;
                    }
                });
                liked--;
                lStor.splice(albumIndex, 1);
            } else {
                albums.find((album, index) => {
                    if (album.id === id) {
                        albums[index].isLiked = true;
                    }
                });
                liked++;
                lStor.push({id, genre: genre});
            }
        } else {
            albums.find((album, index) => {
                if (album.id === id) {
                    albums[index].isLiked = true;
                }
            });
            liked++;
            lStor = [{id, genre: genre}];
        }
        localStorage.setItem('albums_liked', JSON.stringify(lStor));
        return liked;
    }
}
