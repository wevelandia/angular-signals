import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

// De directivas personalizadas las más comunes son para el manejo de errores y el draganddrop.

//[appCustomLabel]: Este es el nombre de la directiva y se realiza el llamado así en HTML.
// Esta directiva tambien se puede colocar con un guion ejemplo: [custom-Label], pero la manejamos como sigue la nomenclatura Angular que es lowercamercase.
@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  // Como se desea tener control del span en toda esta directiva creamos una variable
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  // Se hace la funcionalidad que se quiere de que la directiva me muestre los errores que se van presentando y por ello se define la siguiente variable.
  private _errors?: ValidationErrors | null;


  // El set es para establecer el color.
  @Input() set color( value: string ) {
    //console.log({color: value});
    this._color = value;
    this.setStyle();
  }

  // Hacemos el Input para poderlo recibir
  @Input() set errors( value: ValidationErrors | null | undefined ) {
    // Se le coloca tambien undefined porque en el html que se realizó presenta error; [errors]="myform.get('name')?.errors"
    this._errors = value;
    //console.log(value);
    this.setErrorMessage();
  }

  // Aca en el contructor se pueden inyertar varias cosas
  constructor( private el: ElementRef<HTMLElement>) {
    //console.log('Contructor de la Directiva');
    //console.log(el);
    this.htmlElement = el;

    // Despues de a asignacion se le puede asignar un valor al span.
    // Se le puede cambiar la forma, se le pueden crear listener todo a travez de la directiva, y pasan por todos los ciclos de vida.
    //this.htmlElement.nativeElement.innerHTML = 'Hola mundo';

    // El color que obtenemos lo queremos recibir como una propiedad hacia la directiva y cambiar el color del texto.
  }

  ngOnInit(): void {
    // Esto nos permitiria hacer una petición http cuando es incializada la Directva.
    //console.log('Directiva - ngOnInit');

    this.setStyle();
  }

  // Creamos un metodo para poder cambiar el color del elemento
  setStyle(): void {
    // Aca se le pueden adicional clases o cambiar el estilo

    // Aca sale un mensaje de que es potencialmente inseguro, para resolverlo se hace una condición de seguridad
    // this.htmlElement?.nativeElement.style.color = this._color;
    if ( !this.htmlElement ) return;
    this.htmlElement.nativeElement.style.color = this._color;

  }

  // Se crea un nuevo metodo
  setErrorMessage():void {
    if ( !this.htmlElement ) return;
    if ( !this._errors ) {
      this.htmlElement.nativeElement.innerHTML = 'No hay errores';
      return;
    }

    // Definimos una constante para el manejo de los errores
    const errors = Object.keys(this._errors);
    console.log(errors);

    if ( errors.includes('required') ) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if ( errors.includes('minlength') ) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `Mínimo ${ current }/${ min } caracteres.`;
      return;
    }

    if ( errors.includes('email') ) {
      this.htmlElement.nativeElement.innerText = 'No tiene formato de correo.';
      return;
    }
  }
}
