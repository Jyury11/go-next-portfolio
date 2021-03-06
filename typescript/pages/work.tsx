import { Box, Center, Flex, Spacer, Image, Link } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
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
              id="work-block"
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
                Work
              </Box>
            </Center>

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
                Go Next Portfolio
              </Box>
            </Center>

            <Center
              bg="lightblue"
              h={["40px", "75px"]}
              mt="10"
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
                Admin Page
              </Box>
            </Center>
            <Flex>
              <Image
                src={`/admin-home.png`}
                width={"40%"}
                height={"40%"}
                p={["1", "5"]}
                ml={["2", "20"]}
                alt={"admin-home.png`"}
              />
              <Spacer />
              <Image
                src={`/admin-slide.png`}
                width={"40%"}
                height={"40%"}
                p={["1", "5"]}
                mr={["2", "20"]}
                alt={"admin-home.png`"}
              />
            </Flex>

            <Center
              bg="lightblue"
              h={["40px", "75px"]}
              mt="10"
              mx={["10", "20"]}
              shadow={"2xl"}
              borderRadius="base"
              scrollBehavior={"smooth"}
            >
              <Box
                mt="1"
                fontWeight="semibold"
                fontSize={["medium", "5xl"]}
                as="h4"
                lineHeight="tight"
                noOfLines={1}
              >
                Git hub
              </Box>
            </Center>

            <Center
              bg="lightgray"
              h={["40px", "75px"]}
              mx={["10", "20"]}
              mb="20"
              shadow={"2xl"}
              borderRadius="base"
              scrollBehavior={"smooth"}
              color="blue"
            >
              <Link
                href="https://github.com/Jyury11/go-next-portfolio"
                target={"_blank"}
              >
                https://github.com/Jyury11/go-next-portfolio
              </Link>
            </Center>
          </Box>
        </main>
      </Box>
    </Layout>
  );
};

export default Home;
