import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("health")
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check(): Promise<{
    status: string;
    servico: string;
    db: string;
    ts: string;
  }> {
    let db = "indisponivel";
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      db = "ok";
    } catch {
      db = "indisponivel";
    }
    return {
      status: "ok",
      servico: "carretao-api",
      db,
      ts: new Date().toISOString(),
    };
  }
}
