import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLabelDirective } from './directives/custom-label.directive';


// Las Directivas tiene que ser declaradas en el modulo como un componente, y si se quiere utilziar fuera de este componente se deben de exportar.
@NgModule({
  declarations: [
    CustomLabelDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomLabelDirective
  ]
})
export class SharedModule { }
