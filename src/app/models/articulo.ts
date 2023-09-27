export class Articulo {
   constructor(
        _id = '',
        titulo = '',
        album = '',
        autor = '',
        compositor = '',
        anio = '',
        genero = '',
        formato = '',
        ubicacion = ''
        ) {
            this._id = _id;
            this.titulo = titulo;
            this.album = album;
            this.autor = autor;
            this.compositor = compositor;
            this.anio = anio;
            this.genero = genero;
            this.formato = formato;
            this.ubicacion = ubicacion;
   }

    _id: string;
    titulo: string;
    album: string;
    autor: string;
    compositor: string;
    anio: string;
    genero: string;
    formato: string;
    ubicacion: string;
}
