import { ActionReducerMap } from "@ngrx/store";
import { UserState } from "../models/usuario.state";
import { autenticacionReducer } from "./usuario.reducer";

export interface AppState {
  usuario: UserState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  usuario: autenticacionReducer
}
