import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Header } from "../../components/header";
import { useEffect, useState } from "react";
import { useUser } from "../../context/user.context";
import FormData from "form-data";
import { useParams } from "react-router-dom";
import { api } from "../../services";

export const HomeSocial = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [listPeoples, setListPeoples] = useState<any>(null);
  const [counter, setCounter] = useState(0);
  const { uploadCsv, getAllPeople, setPage, page, loginUser } = useUser();
  const { id } = useParams();

  useEffect(() => {
    const allPeople = async () => {
      const peoples = await getAllPeople(page);

      setListPeoples(peoples);
    };
    allPeople();

    const getToken = async () => {
      try {
        const res = await api.get(`/api/user/${id.substring(5)}`);

        loginUser({ email: res.data.email, password: res.data.nickname });
      } catch (error) {
        console.error(error);
      }
    };
    getToken();
  }, [counter, page]);

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    uploadCsv(formData);
    setCounter(counter + 1);
  };

  return (
    <>
      <Flex position={"relative"} h={"100%"}>
        <Header />
        <Flex
          h={"100%"}
          w={"95vw"}
          justifyContent={"space-between"}
          m={"120px auto 80px auto"}
          direction={{ base: "column", md: "row" }}
          gap={"2rem"}
        >
          <Box
            boxShadow={"dark-lg"}
            borderRadius={4}
            w={{ base: "100%", md: "320px" }}
            minW={"300px"}
            p={4}
            h={"max-content"}
          >
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>Selecione o arquivo CSV</FormLabel>
                <Input
                  type="file"
                  h={"50px"}
                  p={"10px"}
                  onChange={(event) => setSelectedFile(event.target.files[0])}
                />
              </FormControl>
              <Button colorScheme="purple" mt={"1rem"} type="submit">
                Enviar
              </Button>
            </form>
          </Box>
          <Box
            boxShadow={"dark-lg"}
            borderRadius={4}
            p={4}
            w={{ base: "100%", md: "100%" }}
          >
            <Flex direction={"column"} gap={"2rem"}>
              <Heading as="h4" size="md">
                Lista de dados
              </Heading>
              {listPeoples && listPeoples.length > 0 ? (
                listPeoples.map((el) => {
                  return (
                    <Card key={el.id}>
                      <CardHeader>
                        <Heading size="md">{el.nome}</Heading>
                      </CardHeader>

                      <CardBody>
                        <Stack divider={<StackDivider />} spacing="4">
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              idade
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              {el.idade} anos
                            </Text>
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              email
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              {el.email}
                            </Text>
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              celular
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              {el.celular}.
                            </Text>
                          </Box>
                        </Stack>
                      </CardBody>
                    </Card>
                  );
                })
              ) : (
                <Card>
                  <Heading size="xs" textTransform="uppercase">
                    Você ainda não cadastrou nenhuma pessoa.
                  </Heading>
                </Card>
              )}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
