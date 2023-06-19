import { useToast } from "@chakra-ui/react";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services";

interface IUserContext {
  isLogged: boolean;
  loginUser: (payload: ILogin) => Promise<void>;
  registerUser: (payload: ICreateUser) => Promise<void>;
  logout: () => void;
  uploadCsv: (file: any) => Promise<void>;
  getAllPeople: (current_page: number) => Promise<any>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  socialLogin: () => Promise<void>;
}

export interface ICreateUser {
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export const UserContext = createContext({} as IUserContext);

const UserProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const toast = useToast();

  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "@TOKEN"
  )}`;

  const loginUser = async (payload: ILogin) => {
    localStorage.clear();
    try {
      const res = await api.post("/api/login", payload);

      localStorage.setItem("@TOKEN", res.data.data.token);
      toast({
        title: "Login realizado!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });

      setIsLogged(true);
      navigate("/home");
    } catch (error) {
      toast({
        title: "Dados incorretos!",
        description: "Email e/ou senha estão incorretos.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      console.error(error);
    }
  };

  const socialLogin = async () => {
    try {
      const { data } = await api.get("/api/auth/redirect");
      console.log(data);
      window.location.href = data;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
    setIsLogged(false);
  };

  const registerUser = async (payload: ICreateUser) => {
    try {
      await api.post("/api/user", payload);
      toast({
        title: "Conta criada!",
        description: "Criamos uma conta para você.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "E-mail já existe!",
        description: "E-mail já existe!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      console.error(error);
    }
  };

  const uploadCsv = async (file: any) => {
    try {
      await api.post("/api/people", file);
      toast({
        title: "Dados enviados!",
        description: "Os dados do CSV foram enviados.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Arquivo não suportado!",
        description:
          "Verifique se o arquivo enviado e do modelo e extensão correta",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const getAllPeople = async (current_page: number) => {
    try {
      const { data } = await api.get(`/api/people`);
      return data;
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        isLogged,
        loginUser,
        registerUser,
        logout,
        uploadCsv,
        getAllPeople,
        setPage,
        page,
        socialLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserContext => useContext(UserContext);

export default UserProvider;
