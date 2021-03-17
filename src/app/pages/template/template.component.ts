import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario:any = {
    nombre:'',
    apellidos:'',
    email:'',
    pais:'',
    genero:'m'
  }
  paises:any[] = []
  

  constructor(private paisService:PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe(paises => this.paises = [
        {name:'[ Selecciones pais ]',code:''},
        ...paises
      ])
  }

  save(form:NgForm){
    console.log(form)
  }

}
