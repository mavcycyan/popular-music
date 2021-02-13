export interface Album {
    id: string;
    mbid?: string;
    name: string;
    image: Array<object>;
    isLiked: boolean;
    artist: object;
}

export interface AlbumStorage {
    id: string;
    genre: string;
}
