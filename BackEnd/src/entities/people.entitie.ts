import { hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("peoples")
class People {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  idade: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  data_nasc: string;

  @Column()
  sexo: string;

  @Column()
  signo: string;

  @Column()
  mae: string;

  @Column()
  pai: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  cep: string;

  @Column()
  endereco: string;

  @Column()
  numero: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  telefone_fixo: string;

  @Column()
  celular: string;

  @Column()
  altura: string;

  @Column()
  peso: string;

  @Column()
  tipo_sanguineo: string;

  @Column()
  cor: string;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    if (this.senha) this.senha = hashSync(this.senha, 10);
  }
}

export default People;
