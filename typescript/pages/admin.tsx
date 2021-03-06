import {
  Box,
  Center,
  Badge,
  Flex,
  Spacer,
  Text,
  Textarea,
  Spinner,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Stack,
  Grid,
  GridItem,
  Image,
  Divider,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import { useState, useRef } from "react";
import { HiStar } from "react-icons/hi";
import { Layout } from "../components";
import { signIn, signOut, useSession } from "next-auth/react";

const url =
  process.env.NODE_ENV === "development"
    ? "https://localhost:8080/api/v1/portfolios/"
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

const categories = [
  "profile",
  "language",
  "framework",
  "infra",
  "tool",
  "qualification",
];

const skillLevels = [1, 2, 3, 4, 5];

export const Home: NextPage = () => {
  const { data: session, status: status } = useSession();
  const { data, error, mutate } = useSWR(url, fetcher());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [isUpdate, setIsUpdate] = useState(true);

  const openInput = (index: number, isUpdate: boolean) => {
    return () => {
      setSelectedIndex(index);
      setSelectedTitle(portfolios.portfolios[index].title);
      setSelectedImage(portfolios.portfolios[index].image);
      setSelectedCategory(portfolios.portfolios[index].category);
      setSelectedDescription(portfolios.portfolios[index].description);
      setSelectedLevel(portfolios.portfolios[index].skillLevel);
      setIsUpdate(isUpdate);
      onOpen();
    };
  };
  if (!session)
    return (
      <>
        {status === "loading" ? (
          <>Loading ...</>
        ) : (
          <Layout href="./">
            <Box>
              <Head>
                <title>?????????????????????</title>
                <meta name="description" content="Generated by ryuju aono" />
              </Head>
              <main>
                <Center mt="10%">
                  <Box>
                    <Text border="2px" m="5" p="5">
                      Not Sign in. Please Sing in with Okta
                    </Text>
                  </Box>
                </Center>
                <Center mt="10%">
                  <Box>
                    <Button w="100%" px="10" py="5" onClick={() => signIn()}>
                      Sign in with Okta
                    </Button>
                  </Box>
                </Center>
              </main>
            </Box>
          </Layout>
        )}
      </>
    );

  if (status !== "authenticated")
    return (
      <>
        <Layout href="./">
          <Box>
            <Head>
              <title>?????????????????????</title>
              <meta name="description" content="Generated by ryuju aono" />
            </Head>
            <main>
              <Center mt="10%">
                <Box>
                  <Text border="2px" m="5" p="5">
                    Not Authenticated. Access Denied.
                  </Text>
                </Box>
              </Center>
            </main>
          </Box>
        </Layout>
      </>
    );

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Layout href="./">
        <Box>
          <Head>
            <title>?????????????????????</title>
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
          <title>?????????????????????</title>
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
                portfolio admin setting
              </Box>
            </Center>

            <Box>
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
                  portfolio items
                </Box>
              </Center>
              <Box borderRadius="lg" overflow="hidden">
                {portfolios.portfolios.map((element, index) => {
                  return (
                    <>
                      <Divider border="2px" bg="black" />
                      <Flex mx={["10", "20"]} px={["10", "20"]}>
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
                        <Spacer />
                        <Center>
                          <Button
                            key={element.id}
                            onClick={openInput(index, true)}
                            _hover={{
                              bg: "gray",
                            }}
                            borderRadius="full"
                            margin={["2", "10"]}
                            padding={["2", "10"]}
                          >
                            +
                          </Button>
                        </Center>
                        <Center>
                          <Button
                            key={element.id}
                            onClick={() =>
                              onSubmitToDelete(
                                portfolios.portfolios[index],
                                session.accessToken as string
                              )
                            }
                            _hover={{
                              bg: "orange",
                            }}
                            bg="red"
                            borderRadius="full"
                            margin={["2", "10"]}
                            padding={["2", "10"]}
                          >
                            -
                          </Button>
                        </Center>
                      </Flex>
                    </>
                  );
                })}
              </Box>
            </Box>

            <Button
              key={"absolute"}
              onClick={() => {
                portfolios.portfolios.push({
                  title: "",
                  image: "",
                  description: "",
                  skillLevel: 1,
                  category: "profile",
                } as PortfolioType);
                openInput(portfolios.portfolios.length - 1, false)();
              }}
              _hover={{
                bg: "gray",
              }}
              bg="orange"
              w={["75px", "150px"]}
              h={["75px", "150px"]}
              borderRadius="full"
              margin={["2", "10"]}
              padding={["2", "10"]}
              position={"fixed"}
              zIndex="1"
              bottom="10"
              right="10"
              shadow={"2xl"}
            >
              +
            </Button>

            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  fix portfolio item
                </DrawerHeader>

                <DrawerBody>
                  <Stack spacing="24px">
                    <Box>
                      <FormLabel htmlFor="username">Title</FormLabel>
                      <Input
                        placeholder="Please enter title"
                        value={selectedTitle}
                        onChange={(event) =>
                          setSelectedTitle(event.target.value)
                        }
                      />
                    </Box>

                    <Box>
                      <FormLabel htmlFor="url">Image</FormLabel>
                      <InputGroup>
                        <Input
                          type="url"
                          placeholder="Please enter image"
                          value={selectedImage}
                          onChange={(event) =>
                            setSelectedImage(event.target.value)
                          }
                        />
                      </InputGroup>
                    </Box>

                    <Box>
                      <FormLabel htmlFor="owner">Select Category</FormLabel>
                      <Select
                        defaultValue="profile"
                        value={selectedCategory}
                        onChange={(event) =>
                          setSelectedCategory(event.target.value)
                        }
                      >
                        {categories.map((element) => {
                          return (
                            <option key={element} value={element}>
                              {element}
                            </option>
                          );
                        })}
                      </Select>
                    </Box>

                    <Box>
                      <FormLabel htmlFor="owner">Select Skill Level</FormLabel>
                      <Select
                        defaultValue="1"
                        value={selectedLevel}
                        onChange={(event) =>
                          setSelectedLevel(Number(event.target.value))
                        }
                      >
                        {skillLevels.map((element) => {
                          return (
                            <option key={element} value={element}>
                              {element}
                            </option>
                          );
                        })}
                      </Select>
                    </Box>

                    <Box>
                      <FormLabel htmlFor="desc">Description</FormLabel>
                      <Textarea
                        id="desc"
                        value={selectedDescription}
                        onChange={(event) =>
                          setSelectedDescription(event.target.value)
                        }
                        h="500px"
                      />
                    </Box>
                  </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth="1px">
                  <Button
                    variant="outline"
                    mr={3}
                    onClick={() => {
                      !isUpdate && portfolios.portfolios.pop();
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      portfolios.portfolios[selectedIndex].title =
                        selectedTitle;
                      portfolios.portfolios[selectedIndex].image =
                        selectedImage;
                      portfolios.portfolios[selectedIndex].category =
                        selectedCategory;
                      portfolios.portfolios[selectedIndex].description =
                        selectedDescription;
                      portfolios.portfolios[selectedIndex].skillLevel =
                        selectedLevel;
                      isUpdate
                        ? onSubmitToUpdate(
                            portfolios.portfolios[selectedIndex],
                            session.accessToken as string
                          )
                        : onSubmitToCreate(
                            portfolios.portfolios[selectedIndex],
                            session.accessToken as string
                          );
                    }}
                  >
                    Submit
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Box>
        </main>
      </Box>
    </Layout>
  );
};

const onSubmitToUpdate = (portfolio: PortfolioType, token: string): void => {
  fetch(`${url}${portfolio.id.toString()}`, {
    method: "PUT",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(portfolio),
    credentials: "include",
    mode: "cors",
  })
    .then(async (ok) => {
      const message = ok ? "?????????????????????" : "??????????????????????????????";
      alert(message);
    })
    .catch((err) => {
      alert(err);
    });
};

const onSubmitToCreate = (portfolio: PortfolioType, token: string): void => {
  fetch(`${url}`, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(portfolio),
    credentials: "include",
    mode: "cors",
  })
    .then(async (ok) => {
      const message = ok ? "?????????????????????" : "??????????????????????????????";
      if (ok) {
        ok.json().then((value) => {
          console.log(value);
          portfolio.id = value.id;
          alert(message);
        });
      } else {
        alert(message);
      }
    })
    .catch((err) => {
      alert(err);
    });
};

const onSubmitToDelete = (portfolio: PortfolioType, token: string): void => {
  confirm("?????????????????????") &&
    fetch(`${url}${portfolio.id.toString()}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      body: JSON.stringify(portfolio),
      credentials: "include",
      mode: "cors",
    })
      .then(async (ok) => {
        const message = ok ? "?????????????????????" : "??????????????????????????????";
        alert(message);
      })
      .catch((err) => {
        alert(err);
      });
};

export default Home;
