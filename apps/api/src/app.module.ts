import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { HealthModule } from "./health/health.module";
import { ComissaoModule } from "./comissao/comissao.module";
import { PedidosModule } from "./pedidos/pedidos.module";

@Module({
  imports: [PrismaModule, HealthModule, ComissaoModule, PedidosModule],
})
export class AppModule {}
