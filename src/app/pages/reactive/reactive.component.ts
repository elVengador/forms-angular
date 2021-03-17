import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma:FormGroup
  
  constructor(private fb: FormBuilder,
              private validacionServices:ValidacionesService) {
    this.crearFormulario()
    this.cargarDataFormulario()
    this.crearListener()
   }

  ngOnInit(): void {
  }

  get nombreInvalido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidosInvalido(){
    return this.forma.get('apellidos').invalid && this.forma.get('apellidos').touched
  }

  get emailInvalido(){
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }

  get usuarioInvalido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }

  get passwordInvalido(){
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }
  get confirmPasswordInvalido(){
    /*const pass1 = this.forma.get('password').value
    const pass2 = this.forma.get('confirmPassword').value
    return (this.forma.get('confirmPassword').invalid || pass1!==pass2) && this.forma.get('confirmPassword').touched */
    
    return this.forma.get('confirmPassword').invalid && this.forma.get('confirmPassword').touched
  }

  get distritoInvalido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadInvalido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(2)]],
      apellidos:['',[Validators.required,Validators.minLength(2),this.validacionServices.noHerrera]],
      email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario:['',,this.validacionServices.exiteUsuario],
      password:['',[Validators.required,Validators.minLength(3)]],
      confirmPassword:['',[Validators.required,Validators.minLength(3)]],
      direccion: this.fb.group({
        distrito:['',[Validators.required,Validators.minLength(2)]],
        ciudad:['',[Validators.required,Validators.minLength(2)]]
      }),
      pasatiempos:this.fb.array([])
    },{
      validators: this.validacionServices.camposIguales('password','confirmPassword')
    })
  }

  crearListener(){
    //hay ciertas propiedades de nuestra forma que devuelven un observable
    // podemos subcribirnos para estal al pendiente de los cambios de esos valores
    this.forma.valueChanges.subscribe(valor=>console.log(valor))
    // format.statusChanges
    this.forma.get('usuario').valueChanges.subscribe(console.log)
  }

  cargarDataFormulario(){
    // (Importante) se podria usar el reset enves del setValue
    // de esta forma puedes settear solo algunos valores

    // get.set()
    this.forma.setValue({
      nombre: "jimy",
      apellidos: "qc",
      email: "j@g.com",
      usuario:'',
      password:"",
      confirmPassword:"",
      direccion: {
        distrito: "sant",
        ciudad: "cusc"
      },
      pasatiempos:[]
    })

    this.forma.get('email').setValue('a3sdkfgjsdk')
  }

  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control('',Validators.required))
  }

  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i)
  }

  guardar(){
    console.log(this.forma);

    if(this.forma.invalid){
      this.forma.markAllAsTouched();
      /*return Object.values(this.forma.controls).forEach(control => {
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched())
        }
        else {
          control.markAsTouched()
        }

      })*/
    }

    // posteo de la informacion

    this.forma.reset({
      nombre:'anonimo'
    })
  }

  testLog() {
    console.log(this.forma.get('confirmPassword').errors)
  }

}
