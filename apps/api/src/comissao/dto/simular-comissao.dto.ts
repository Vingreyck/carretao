import { IsInt, IsNumber, IsOptional, Max, Min } from "class-validator";

/** Entrada para simular a comissão de um pedido. Ver @carretao/core. */
export class SimularComissaoDto {
  /** Soma dos itens em centavos (base da comissão — RN-A10). */
  @IsInt()
  @Min(0)
  valorItensCentavos!: number;

  /** Percentual de comissão da loja (fração 0..1 — RN-013). */
  @IsNumber()
  @Min(0)
  @Max(1)
  comissaoPercentual!: number;

  /** Take rate da plataforma sobre a comissão (fração — RN-A12). Opcional. */
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  takeRatePlataforma?: number;
}
