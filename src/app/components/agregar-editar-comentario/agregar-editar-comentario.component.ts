import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrls: ['./agregar-editar-comentario.component.css']
})
export class AgregarEditarComentarioComponent implements OnInit {
  comentarios: FormGroup;
  idComentario = 0;
  accion = 'Agregar';
  loading = false;
  comentario: Comentario;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private comentarioService: ComentarioService, private router: Router) {
    this.comentarios = this.fb.group({
       titulo: ['', Validators.required],
       creador: ['', Validators.required],
       texto: ['', Validators.required],
    });
    // tslint:disable-next-line: max-line-length
    // parseo del parametro por url se parsea con el signo + en caso de comparar con un valor de distinto tipo. ya que siempre vienen en string
    if (+this.route.snapshot.paramMap.get('id') > 0){
        this.idComentario = +this.route.snapshot.paramMap.get('id');
    }
   }

  ngOnInit(): void { // on load dek formulario
    this.esEditar();
  }

  guardarComentario(){
    console.log(this.accion);
    if (this.accion === 'Agregar'){
      const comentario: Comentario = {
       fechaCreacion : new Date(),
       creador : this.comentarios.get('creador').value,
       titulo : this.comentarios.get('titulo').value,
       texto : this.comentarios.get('texto').value,
      };
      this.comentarioService.guardarComentario(comentario).subscribe(data => {
        this.router.navigate(['/']);
      });
    }else{
      const comentario: Comentario = {
        id : this.comentario.id,
        fechaCreacion : this.comentario.fechaCreacion,
        creador : this.comentarios.get('creador').value,
        titulo : this.comentarios.get('titulo').value,
        texto : this.comentarios.get('texto').value,
       };
      this.comentarioService.actualizarComentario(this.idComentario, comentario).subscribe(data => {
        this.router.navigate(['/']);
      });
    }
    console.log(this.comentarios);
  }
  esEditar(){
    if (this.idComentario > 0){
      this.accion = 'Editar';
      this.loading = true;
      this.comentarioService.cargarComentario(this.idComentario).subscribe(
        data =>{
          this.comentario = data;
          this.loading = false;
          this.comentarios.patchValue({
            titulo: data.titulo,
            creador: data.creador,
            texto: data.texto
          }); // formulario
      });
      //this.comentarioService.actualizarComentario(this.idComentario, this.comentario);


    }
  }

}
