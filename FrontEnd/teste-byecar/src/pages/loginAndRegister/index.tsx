import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
import { LoginForm } from "../../components/loginForm";
import { RegisterForm } from "../../components/registrerForm";
import { Header } from "../../components/header";

export const LoginAndRegister = () => {
  return (
    <>
      <Header />
      <Flex
        h={"100vh"}
        w={"100vw"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          h={"500px"}
          w={"500px"}
          boxShadow={"dark-lg"}
          p={5}
          borderRadius={4}
        >
          <Tabs
            isFitted
            variant="enclosed"
            w={"100%"}
            h={"100%"}
            colorScheme="purple"
          >
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Cadastro</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginForm />
              </TabPanel>
              <TabPanel>
                <RegisterForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  );
};
