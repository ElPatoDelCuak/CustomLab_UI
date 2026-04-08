export interface RegisterPayload {
  nombre: string;
  apellidos: string;
  password: string;
  email: string;
  fecha_nacimiento?: string;
  doble_factor?: boolean;
}