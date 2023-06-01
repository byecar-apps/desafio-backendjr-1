import { Button, Flex, Heading } from "@chakra-ui/react";
import { useUser } from "../context/user.context";

export const Header = () => {
  const { logout, isLogged } = useUser();
  return (
    <>
      <Flex
        position={"absolute"}
        top={"0"}
        alignItems={"center"}
        w={"100%"}
        h={"80px"}
        borderBottom={"2px solid"}
        borderColor={"grey.6"}
        justifyContent={"space-between"}
        bg={"grey.10"}
        paddingRight={{ base: "10px", md: "50px" }}
        paddingLeft={{ base: "10px", md: "50px" }}
      >
        <Heading>BYeCAR</Heading>
        {isLogged && (
          <Button colorScheme="purple" onClick={logout}>
            Sair
          </Button>
        )}
      </Flex>
    </>
  );
};
