import { Component} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms'; //para trabajar con la forma de data
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent{

  forma:FormGroup;

  usuario = {    //para mostrar como manejar el tema de tener un objeto dentro de un objeto, para ejemplo mas complejo
    nombreCompleto: {
      nombre: "miguel",
      apellido: "chamorro"
    },
      correo: "ingenieromiguelch@gmail.com",
      //pasatiempos: ["Compartir", "Jugar", "Comer"]
  }

  constructor() {

    console.log(this.usuario);

    this.forma = new FormGroup({ //objeto que se relaciona al formulario y lo controla con formcontrol para pasarle los datos

      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required,
                                      Validators.minLength(3)
                                      ]), //validaciones desde angular
        'apellido': new FormControl('', [
                                        Validators.required,
                                        this.noChamorro
                                        ])
      }),
      'correo': new FormControl('', [
                                      Validators.required,
                                      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                    ]),
      'pasatiempos': new FormArray([
        new FormControl('Compartir', Validators.required )
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario), //validacion asincrona seperando con ,
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    })

    //this.forma.setValue(this.usuario); //quedan precargados los datos
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma) //bind nos permite manejar que propiedad es la referente al contexto this
    ]);

    this.forma.controls['username'].valueChanges
    .subscribe(data=>{
      console.log(data);
    })

    this.forma.controls['username'].statusChanges
    .subscribe(data=>{
      console.log(data);
    })

  }

  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push( //tengo que denotar el formArray cuando es un arreglo
      new FormControl('Jugar', Validators.required)
    )
  }

  //para validar que nadie tenga mi apellido
  noChamorro(control:FormControl):{[s:string]:boolean} {
    if(control.value==="chamorro"){ //control.value = valor de la caja
      return {
        nochamorro:true
      }
    }

    return null;
  }

  noIgual(control:FormControl):{[s:string]:boolean} {
    //console.log(this);
    let forma:any = this;
    if(control.value!==forma.controls['password1'].value){
      return {
        noiguales:true //da el error de validación que no son iguales
      }
    }

    return null; //aqui esta todo bien
  }

  existeUsuario(control: FormControl): Promise<any>|Observable<any>{ //para validaciones asincronas
      let promesa = new Promise(
        (resolve, reject)=>{
          setTimeout(()=>{
            if(control.value==="cr7"){
              resolve({existe:true})
            }else{
              resolve (null)
            }
          }, 3000)
        }
      )
      return promesa;
  }

  guardarCambios(){
    console.log(this.forma.value); //te entrega el valor final del formulario con sus valores llenos
    console.log(this.forma); //propiedades del formulario una vez llenado los campos

    /*this.forma.reset({ //para resetear la información del usuario
      nombreCompleto:{
        nombre: "",
        apellido: ""
      },
      correo: ""
    });*/
  }





}
