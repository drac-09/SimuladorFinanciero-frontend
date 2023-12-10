import { UserModel } from "./user.interface";

export interface UserState {
  datos: UserModel | null;
  haIniciadoSesion: boolean;
}
