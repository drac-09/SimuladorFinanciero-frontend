import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { UserState } from '../models/usuario.state';


// Selector PADRE
export const selectorUsuario = (state: AppState) => state.usuario


// Selectores HIJOS
export const selectorPerfil = createSelector(
  selectorUsuario,
  (state: UserState) => state.datos
)

export const selectorEstado = createSelector(
  selectorUsuario,
  (state: UserState) => state.haIniciadoSesion
)

