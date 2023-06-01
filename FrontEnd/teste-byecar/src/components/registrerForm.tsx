import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ICreateUser, useUser } from "../context/user.context";

export const RegisterForm = () => {
  const [showPassword, setShowpassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { registerUser } = useUser();

  const formSchema = yup.object().shape({
    password: yup.string().required("Este campo é obrigatório"),
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Este campo é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>({ resolver: yupResolver(formSchema) });

  const onSubmitFunction = (paylod: ICreateUser) => {
    registerUser(paylod);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <Flex
          direction={"column"}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
          h={"300px"}
          position={"relative"}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digitar email"
              focusBorderColor="purple"
              {...register("email")}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>

          <FormControl mt={"1rem"}>
            <FormLabel>Senha</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Digitar senha"
                focusBorderColor="purple"
                {...register("password")}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  onClick={() => setShowpassword(!showPassword)}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button
            mt={"1rem"}
            type="submit"
            colorScheme="purple"
            position={"absolute"}
            bottom={0}
            right={0}
          >
            Cadastrar
          </Button>
        </Flex>
      </form>
    </>
  );
};
