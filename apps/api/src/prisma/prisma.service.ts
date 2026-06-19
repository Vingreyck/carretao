import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

/**
 * Cliente Prisma como provider injetável.
 *
 * Não conectamos em onModuleInit de propósito: o Prisma conecta de forma
 * preguiçosa na primeira query, então a API sobe mesmo sem banco disponível
 * (útil para os endpoints de domínio que não tocam o banco). O health-check
 * é quem reporta a disponibilidade do banco.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
