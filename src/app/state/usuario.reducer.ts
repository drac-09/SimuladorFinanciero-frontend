import { createReducer, on } from '@ngrx/store';
import { UserModel } from '../models/user.interface';
import { UserState } from '../models/usuario.state';
import * as UserActions from '../state/usuario.actions'

// Estado incial - inicializamos las variables.
// EstadoAutenticacion: son los tipos de datos que estaremos recibiendo
export const estadoInicial: UserState = {
  datos: null,
  haIniciadoSesion: false,
};

//Funciones
export const autenticacionReducer = createReducer(
  estadoInicial,
  on(UserActions.iniciarSesion, (state, { datos }) => ({ ...state, datos, haIniciadoSesion: true })),
  on(UserActions.cerrarSesion, (state) => ({ ...state, datos: null, haIniciadoSesion: false }))
);
