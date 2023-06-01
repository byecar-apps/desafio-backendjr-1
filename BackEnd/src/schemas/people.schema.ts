import * as yup from "yup";

export const returnedPeoplesShape = yup.array().of(
  yup.object().shape({
    data_nasc: yup.string(),
    sexo: yup.string(),
    signo: yup.string(),
    mae: yup.string(),
    pai: yup.string(),
    email: yup.string(),
    cep: yup.string(),
    endereco: yup.string(),
    numero: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string(),
    telefone_fixo: yup.string(),
    celular: yup.string(),
    altura: yup.string(),
    peso: yup.string(),
    tipo_sanguineo: yup.string(),
    cor: yup.string(),
    cpf: yup.string(),
    rg: yup.string(),
    idade: yup.string(),
    nome: yup.string(),
    id: yup.string(),
  })
);
