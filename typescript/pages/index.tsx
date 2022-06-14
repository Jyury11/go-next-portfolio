import {
  Box,
  Center,
  Text,
  Grid,
  GridItem,
  Image,
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
            <Center bg="lightgreen" h={["50px", "100px"]} color="white">
              <Box
                mt="1"
                fontWeight="semibold"
                fontSize={["3xl", "7xl"]}
                as="h1"
                lineHeight="tight"
                noOfLines={1}
              >
                PORTFOLIO
              </Box>
            </Center>
            <Center bg="lightgreen" h={["50px", "100px"]} color="white">
              <Box
                mt={["0", "1"]}
                fontWeight="semibold"
                as="h2"
                lineHeight="tight"
                noOfLines={1}
              >
                Programmer Ryuju Aono
              </Box>
            </Center>

            <Center
              id="profile-block"
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
                Profile
              </Box>
            </Center>
            <Box borderRadius="lg" overflow="hidden">
              {portfolios.portfolios
                .filter((element) => element.category === "profile")
                .map((element) => {
                  console.log(element);
                  return (
                    <Box key={element.id}>
                      <Grid gap={4} templateColumns="repeat(5, 1fr)">
                        <GridItem p={["0.5", "6"]} colSpan={1}>
                          <Image
                            src={element.image}
                            width={["100px", "300px"]}
                            height={["80px", "280px"]}
                            borderRadius="100%"
                            alt={element.image}
                          />
                        </GridItem>

                        <GridItem p={["0.5", "6"]} colSpan={3}>
                          <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            fontSize={["medium", "lg"]}
                          >
                            {element.title}
                          </Box>

                          <Box>
                            <Text
                              color="gray.500"
                              fontWeight="semibold"
                              fontSize={["small", "lg"]}
                              ml={["0", "2"]}
                              whiteSpace={"pre-wrap"}
                            >
                              {element.description}
                            </Text>
                          </Box>
                        </GridItem>
                      </Grid>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </main>
      </Box>
    </Layout>
  );
};

export default Home;
