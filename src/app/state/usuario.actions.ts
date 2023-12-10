import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.interface';

export const iniciarSesion = createAction(
  '[Autenticacion] Iniciar Sesion',
  props<{ datos: UserModel }>()
);

export const cerrarSesion = createAction('[Autenticacion] Cerrar Sesión');

