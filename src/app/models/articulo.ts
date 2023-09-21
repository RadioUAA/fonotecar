export class Articulo {
    /*
    _id: string = "";
    name: string = "";
    album: string = "";
    autor: string = "";
    year: string = "";
    */
   constructor(
        _id = '',
        name = '',
        album = '',
        autor = '',
        year = ''
        ) {
            this._id = _id;
            this.name = name;
            this.album = album;
            this.autor = autor;
            this.year = year;
   }

    _id: string;
    name: string;
    album: string;
    autor: string;
    year: string;
}
