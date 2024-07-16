import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {

  // Inyectamos el servicio aca.
  private usersService = inject(UsersServiceService);
  // Creamos la señal. El usuario inicial va a ser el 1.
  public userId = signal(1);

  // Ocupo saber cual es el usuario que tiene el Id = 1. Puede ser que ese usuario no exista y me retorna un 404.
  public currentUser = signal<User|undefined>(undefined);

  // Creamos otra señal
  public userWasFound = signal(true);

  // Creamos la señal computada para el nombre completo
  public fullName = computed<string>( () => {
    // Si no tenemos ese usuario
    if ( !this.currentUser() ) return 'Usuario no ecnontrado';

    return `${ this.currentUser()?.first_name } ${ this.currentUser()?.last_name }`;
  });

  ngOnInit(): void {
    this.loadUser( this.userId() );
  }

  loadUser( id: number ) {
    if ( id <= 0 ) return;
    // Esto es sincrono, se actualiza la señal
    this.userId.set(id);
    // Se puede asignar Undefined para que se quite el usuario de la pagina mientras se consulta el siguiente
    this.currentUser.set(undefined);

    // Hacemos la petición http
    /* this.usersService.getUserById( id )
      .subscribe( user =>
        this.currentUser.set( user )
        //console.log({user})
      ); */

      // Manejamos aca si tenemos un usuario para el error.
      this.usersService.getUserById( id )
      .subscribe({
        next: (user) => {
          this.currentUser.set( user );
          this.userWasFound.set( true);
        },
        error: () => {
          this.userWasFound.set(false);
          this.currentUser.set(undefined);
        }
      });

  }

}
