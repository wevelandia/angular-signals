import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {

  // Creamios la primera señal
  // Las señales son WritableSignal, es decir se pueden manipular.
  public counter = signal(10);
  // Creamos una señal de solo lectura (No se puede cambiar en ninguna lado), el squareCounter siempre va a estar pendiente de las señales internas y si cambian va a computar el calor y se actualiza donde se esten usando.
  public squareCounter = computed( () => this.counter() * this.counter() );

  increaseBy( value: number ) {
    // Esta es una manera de hacerlo
    /* this.counter.set( this.counter() + value ); */
    this.counter.update( current => current + value );

    // Como squareCounter es de solo lectura no se puede hacer el llamado a this.squareCounter.update
  }

}
