import {
  Box,
  Center,
  Badge,
  Flex,
  Spacer,
  Text,
  Spinner,
  Grid,
  GridItem,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import { useState } from "react";
import { HiStar } from "react-icons/hi";
import { Layout } from "../components";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/v1/portfolios/"
    : "https://aono-portfolio-portfolio-gateway-1jhwe4ou.an.gateway.dev/api/v1/portfolios/";
const fetcher = () => async () => {
  const result = await fetch(url);
  if (200 <= result.status && result.status < 400) {
    const data = await result.json();
    if (data.status) {
      const status = parseInt(data.status);
      if (200 <= status && status < 400) {
        return data;
      } else {
        console.error(`can't get setting data. http responce is ${status}.`);
        console.error(data);
        return {};
      }
    }
    return data;
  }
  console.error(`can't get setting data. http responce is ${result.status}`);
  return {};
};

const skillCategories = [
  "language",
  "framework",
  "infra",
  "tool",
  "qualification",
];

export const Home: NextPage = () => {
  const { data, error, mutate } = useSWR(url, fetcher());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const openModal = (title: string, body: string) => {
    return () => {
      setModalTitle(title);
      setModalBody(body);
      onOpen();
    };
  };

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Layout href="./">
        <Box>
          <Head>
            <title>ポートフォリオ</title>
            <meta name="description" content="Generated by ryuju aono" />
          </Head>
          <main></main>
        </Box>
      </Layout>
    );

  const portfolios = data as PortfoliosType;
  return (
    <Layout href="./">
      <Box>
        <Head>
          <title>ポートフォリオ</title>
          <meta name="description" content="Generated by ryuju aono" />
        </Head>
        <main>
          <Box scrollBehavior={"smooth"}>
            <Center
              id="skill-block"
              bg="lightskyblue"
              h={["50px", "100px"]}
              color="white"
              m={["2", "10"]}
              shadow={"2xl"}
              borderRadius="full"
              scrollBehavior={"smooth"}
            >
              <Box
                mt={["0", "1"]}
                fontWeight="semibold"
                fontSize={["medium", "5xl"]}
                as="h3"
                lineHeight="tight"
                noOfLines={1}
              >
                Skill
              </Box>
            </Center>

            {skillCategories.map((skillCategory) => {
              return (
                <Box key={skillCategory}>
                  <Center
                    bg="gray"
                    h={["40px", "75px"]}
                    color="white"
                    mx={["10", "20"]}
                    shadow={"2xl"}
                    borderRadius="base"
                    scrollBehavior={"smooth"}
                  >
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      fontSize={["medium", "5xl"]}
                      as="h3"
                      lineHeight="tight"
                      noOfLines={1}
                    >
                      Skill {skillCategory}
                    </Box>
                  </Center>
                  <Box borderRadius="lg" overflow="hidden">
                    {portfolios.portfolios
                      .filter((element) => element.category === skillCategory)
                      .map((element) => {
                        console.log(element);
                        return (
                          <Box
                            key={element.id}
                            onClick={openModal(
                              element.title,
                              element.description
                            )}
                            _hover={{
                              bg: "gray",
                              borderRadius: "full",
                            }}
                            margin={["2", "10"]}
                            padding={["2", "10"]}
                          >
                            <Grid gap={4} templateColumns="repeat(5, 1fr)">
                              <GridItem colSpan={2}>
                                <Center>
                                  <Image
                                    src={element.image}
                                    borderRadius="100%"
                                    width={["50px", "100px"]}
                                    height={["50px", "100px"]}
                                  />
                                </Center>
                              </GridItem>

                              <GridItem colSpan={1}>
                                <Center>
                                  <Box
                                    mt={["2", "4"]}
                                    fontWeight="semibold"
                                    as="h4"
                                    fontSize={["small", "4xl"]}
                                  >
                                    {element.title}
                                  </Box>
                                </Center>
                              </GridItem>
                              <GridItem colSpan={1}>
                                <Center>
                                  <Flex>
                                    {printStarByNumber(element.skillLevel)}
                                  </Flex>
                                </Center>
                              </GridItem>
                            </Grid>
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              );
            })}

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{modalTitle}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{modalBody}</ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    閉じる
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </main>
      </Box>
    </Layout>
  );
};

const printStarByNumber = (num: number): JSX.Element[] => {
  const stars = [];
  for (let i = 0; i < num; i++) {
    stars.push(
      <Box
        color="blue"
        my={["4", "8"]}
        mx={["2", "3"]}
        fontSize={["small", "4xl"]}
        shadow={"2xl"}
      >
        <HiStar />
      </Box>
    );
  }
  return stars;
};

export default Home;
