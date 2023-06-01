import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1685481929354 implements MigrationInterface {
    name = 'Initial1685481929354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "peoples" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "idade" varchar NOT NULL, "cpf" varchar NOT NULL, "rg" varchar NOT NULL, "data_nasc" varchar NOT NULL, "sexo" varchar NOT NULL, "signo" varchar NOT NULL, "mae" varchar NOT NULL, "pai" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "cep" varchar NOT NULL, "endereco" varchar NOT NULL, "numero" varchar NOT NULL, "bairro" varchar NOT NULL, "cidade" varchar NOT NULL, "estado" varchar NOT NULL, "telefone_fixo" varchar NOT NULL, "celular" varchar NOT NULL, "altura" varchar NOT NULL, "peso" varchar NOT NULL, "tipo_sanguineo" varchar NOT NULL, "cor" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "peoples"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
