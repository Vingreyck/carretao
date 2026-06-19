import { IsString } from "class-validator";

/** Entrada para validar uma transição de estado do pedido (RN-037). */
export class ValidarTransicaoDto {
  @IsString()
  de!: string;

  @IsString()
  para!: string;
}
