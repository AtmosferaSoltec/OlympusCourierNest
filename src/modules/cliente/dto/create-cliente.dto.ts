import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from "class-validator";

export class CreateClienteDto {
  @IsNumber({}, { message: "El cod_tipodoc debe ser un número" })
  @IsPositive({ message: "El cod_tipodoc debe ser un número positivo" })
  @IsIn([1, 6, 4], {
    message: "El cod_tipodoc debe ser (1) DNI - (6) RUC - (4) CE",
  })
  cod_tipodoc: string;

  @IsString({ message: "El documento debe ser un texto" })
  @IsNotEmpty({ message: "El documento no debe estar vacío" })
  documento: string;

  @IsString({ message: "El nombre debe ser un texto" })
  @IsNotEmpty({ message: "El nombre no debe estar vacío" })
  nombres: string;

  @IsString({ message: "El telefono debe ser un texto" })
  @IsNotEmpty({ message: "El telefono no debe estar vacío" })
  telefono: string;

  @IsString({ message: "El correo debe ser un texto" })
  @IsNotEmpty({ message: "El correo no debe estar vacío" })
  correo: string;

  //Verificar que solo permita valores de M o F
  @IsString({ message: "El genero debe ser un texto" })
  @IsNotEmpty({ message: "El genero no debe estar vacío" })
  @IsIn(["M", "F", "S"], {
    message: "El género debe ser (M) Masculino - (F) Femenino - (S) Sin Genero",
  })
  genero: string;

  @IsNumber({}, { message: "El id_distrito debe ser un número" })
  @IsPositive({ message: "El id_distrito debe ser un número positivo" })
  id_distrito: number;

  @IsString({ message: "La dirección debe ser un texto" })
  @IsNotEmpty({ message: "La dirección no debe estar vacía" })
  direc: string;

  @IsString({ message: "La referencia debe ser un texto" })
  @IsNotEmpty({ message: "La referencia no debe estar vacía" })
  referencia: string;

  @IsString({ message: "La url_maps debe ser un texto" })
  @IsNotEmpty({ message: "La url_maps no debe estar vacía" })
  url_maps: string;
}
