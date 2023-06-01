import * as yup from "yup";

export const userArrayReturnedShape = yup.array().of(
  yup.object().shape({
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    email: yup.string().required(),
    id: yup.string().required(),
  })
);

export const loginShape = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const returnUserShape = yup.object().shape({
  updatedAt: yup.date().required(),
  createdAt: yup.date().required(),
  email: yup.string().required(),
  id: yup.string().required(),
});

export const registerUserShape = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const updateUserShape = yup.object().shape({
  email: yup.string().email(),
  password: yup.string(),
});
