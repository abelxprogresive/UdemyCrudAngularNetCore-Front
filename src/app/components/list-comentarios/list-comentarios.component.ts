import { Component, OnInit } from '@angular/core';
import {Comentario} from '../../models/comentario';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-list-comentarios',
  templateUrl: './list-comentarios.component.html',
  styleUrls: ['./list-comentarios.component.css']
})
export class ListComentariosComponent implements OnInit {
  listComentarios: Comentario[];
  loading = false;
  constructor(private comentarioService: ComentarioService) {

   }

  ngOnInit(): void {
    this.cargarComentario();
  }

  cargarComentario(){
    this.loading =  true;
    this.comentarioService.getListComentario().subscribe(data => {
      this.loading =  false;
      this.listComentarios = data;
    });
  }

  delete(id:number){
    this.loading =  true;
    this.comentarioService.deleteComentario(id).subscribe(data => {
      this.cargarComentario();
      this.loading =  false;
    });
  }

}
