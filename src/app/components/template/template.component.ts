import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`.ng-invalid.ng-touched:not(form){
    border:1px solid red;
  }`]
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: "",
    sexo:"Hombre",
    acepta:false
  }

  paises = [{
    codigo: "CHI",
    nombre: "Chile"
  },
  {
    codigo: "ESP",
    nombre: "España",

  }]

  sexos:string [] = ["Hombre", "Mujer"];
  constructor() { }

  ngOnInit() {
  }

  guardar(forma:NgForm){
    console.log(forma);
    console.log('Valor', forma.value);
    console.log('Usuario', this.usuario);

  }
}