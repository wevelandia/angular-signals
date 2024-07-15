import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {

  // Otra forma de hacer inyecciones es el siguiente, y es igual al codigo que se define en la linea comentareada del contructor:
  private fb = inject( FormBuilder );
  //constructor( private fb: FormBuilder ) {}

  public color: string = 'green';

  // A este campo se le estan adicionando tres validaciones.
  public myform: FormGroup = this.fb.group({
    // Valor inicial vacio, validaciones
    name: ['', [ Validators.required, Validators.minLength(6), Validators.email ] ]
  });

  changeColor() {
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    this.color = color;
  }

}
