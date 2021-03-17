import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';


interface errorValidate{
  [s:string] : boolean
}
@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  /**
   * es solo una funcionq ue devuelve un objeto
   */
  noHerrera(control:FormControl):errorValidate{
    if(control.value?.toLowerCase()==='herrera'){
      return {noHerrera:true}
    }
    return null
  }

  camposIguales(campo1:string,campo2:string){
    return (control:AbstractControl):ValidationErrors | null =>{
      const pass1 = control.get(campo1)?.value
      const pass2 = control.get(campo2)?.value

      if(pass1 !== pass2){
        control.get(campo2)?.setErrors({noIguales:true, noCalc: true});
        return {noIguales:true, noCalc: true}
      }

      return null
    }
  }
  exiteUsuario(control:FormControl):Promise<errorValidate>| Observable<errorValidate | null>{
    if(!control.value) return Promise.resolve(null)
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value === 'strider'){
          resolve({existe:true})
        }else{
          resolve(null)
        }
      },3000)
    })
  }
}
