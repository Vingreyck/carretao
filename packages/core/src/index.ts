/**
 * @carretao/core — regras de domínio do Carretão.
 *
 * Ponto único onde vivem cálculo de comissão, máquinas de estado e
 * atribuição do mecânico. Citado por ID de regra (RN-*) nos testes e no
 * código da API. Ver docs/03 e docs/04.
 */
export * from "./enums";
export * from "./params";
export * from "./commission";
export * from "./order-state";
export * from "./commission-state";
export * from "./attribution";
