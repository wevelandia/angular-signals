import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';
import { UserInfoPageComponent } from '../user-info-page/user-info-page.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnDestroy, OnInit {

  // Vamos a crear otra señal
  public counter = signal(10);

  //Iniciamos con el tema de slas mutaciones.
  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });

  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name }` );

  // Los efectos en las señales es una manera de ejecutar un efecto secundario, por ejemplo que aparezca un mensaje o un dialogo cuando una o varias señales cambien.
  // Y estos efectos cuentan con una limpieza automatica, saben cuando limpiarse.
  // Vamos a establecer ese efecto. La ventaja de hacerlo dentro del componente es que se ejecuta esa limpieza automatica, porque tambien se puede definir antes del @Component
  public userChangedEffect = effect( () => {
    // Se ejecuta la primera vez pero no se cambia porque no le he asignado el cambio a una señal
    //console.log('userChangedEffect triggered');
    // Aca detectamos un cambio de señal.
    //console.log(this.user().first_name);

    console.log(`${this.user().first_name} - ${ this.counter() }`);

  })

  ngOnInit(): void {
    // Creamos un setInterval que se ejecuta cada segundo
    // Aca se quiere demostrar la limpieza del efecto y no del Interval
    setInterval( () => {
      this.counter.update( current => current + 1 );

      if ( this.counter() == 15 )
         this.userChangedEffect.destroy();
    },1000);
  }

  ngOnDestroy(): void {
    // Si manualmente se quiere destruir esos efectos se hace con la siguiente linea, pero esto lo hace Angular automaticamente por ello no se usa.
    //this.userChangedEffect.destroy();
  }

  increaseBy( value: number ) {
    // Cada vez que se cambia el contador o el nombre se obtiene la ultima emisión de ese objeto.
    this.counter.update( current => current + value  );
  }

  onFieldUpdated( field: keyof User, value: string ) {
    //console.log({ field, value });
    // Si se desea cambiar un dato se hace lo siguiente pero es potencialmente inseguro porque no se sabe que campo se envia.
    // Si se coloca en le Input un campo que no existe este se crea nuevamente por ejemplo: (input)="onFieldUpdated( 'correo', txtEmail.value )", aca se va a crear un nuevo campo correo por ello este código es potencialmente inseguro.
    // Si cambiamos el tipo de dato de field a User se presentara el error de que correo no existe y no ejecuta la aplicación.
    // field: string - Se cambio por field: keyof User, el mensaje que sale es este: Argument of type '"correo"' is not assignable to parameter of type 'keyof User'.
    /* this.user.set({
      ...this.user(),
      [field]: value,
    }); */

    // hay una manera mas elegante de hacer lo anterior.
    //this.user.mutate Ya no existe ne las funciones de angular 16 para arriba y ahora se trabaja con update.
    /* this.user.update( current => ({
      ...current,
      [field]: value
    })); */
    this.user.update( current => {

      switch( field ) {

        case 'email':
          current.email = value;
          break;

        case 'avatar':
          current.avatar = value;
          break;

        case 'first_name':
          current.first_name = value;
          break;

        case 'last_name':
          current.last_name = value;
          break;

        case 'id':
          current.id = Number(value);
          break;

      }
      // Aca se estaba retornando solo current.
      // Pero se usa el operador spread (...) para que Angular creee una nueva referencia de current y así detecte que hubo un cambio en fist_name
      return {...current};
    });

  }
}
