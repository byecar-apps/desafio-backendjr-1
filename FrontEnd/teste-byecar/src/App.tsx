import { ChakraProvider } from "@chakra-ui/react";
import MakeRoutes from "./routes";
import UserProvider from "./context/user.context";

function App() {
  return (
    <>
      <ChakraProvider>
        <UserProvider>
          <MakeRoutes />
        </UserProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
