import { Box, Flex, Link, Spacer, Divider } from "@chakra-ui/react";
import NextLink from "next/link";
import { HiOutlineHome } from "react-icons/hi";
import { motion } from "framer-motion";

type LayoutProps = {
  children: JSX.Element;
  href: string;
};

const Layout = ({ href = "/", children }: LayoutProps): JSX.Element => {
  return (
    <Box>
      <Box
        as="header"
        bg="steelblue"
        color="white"
        position={"fixed"}
        w="full"
        zIndex="1"
      >
        <Flex>
          <Box
            fontSize={["medium", "xxx-large"]}
            marginX="2"
            marginY="auto"
            _hover={{
              bg: "darkblue",
            }}
            borderRadius="full"
          >
            <NextLink href={href}>
              <Link
                onClick={() => (document.activeElement as HTMLElement).blur()}
              >
                <HiOutlineHome />
              </Link>
            </NextLink>
          </Box>
          <Spacer />
          <Flex as="nav">
            <NextLink href={resolveExt("/")}>
              <Box
                marginX="auto"
                marginY="auto"
                padding="4"
                fontSize={["medium", "xxx-large"]}
                _hover={{
                  bg: "darkblue",
                }}
                borderRadius="full"
              >
                profile
              </Box>
            </NextLink>
            <NextLink href={resolveExt("/skill")}>
              <Box
                marginX="auto"
                marginY="auto"
                padding="4"
                fontSize={["medium", "xxx-large"]}
                _hover={{
                  bg: "darkblue",
                }}
                borderRadius="full"
              >
                skill
              </Box>
            </NextLink>
            <NextLink href={resolveExt("/work")}>
              <Box
                marginX="auto"
                marginY="auto"
                padding="4"
                fontSize={["medium", "xxx-large"]}
                _hover={{
                  bg: "darkblue",
                }}
                borderRadius="full"
              >
                work
              </Box>
            </NextLink>
            <Divider orientation="vertical" />
            <NextLink
              href={
                process.env.NODE_ENV === "development"
                  ? "/admin"
                  : "https://storage.cloud.google.com/aono-portfolio-frontend/admin.html"
              }
            >
              <Box
                marginX="auto"
                marginY="auto"
                padding="4"
                fontSize={["medium", "xxx-large"]}
                _hover={{
                  bg: "darkblue",
                }}
                borderRadius="full"
              >
                admin
              </Box>
            </NextLink>
          </Flex>
        </Flex>
      </Box>
      <motion.div
        initial={{ opacity: 0, y: 10 }} // 初期状態
        animate={{ opacity: 1, y: 0 }} // マウント時
        exit={{ opacity: 0, y: 10 }} // アンマウント時
        transition={{
          duration: 0.5,
        }}
      >
        <Box pt="20">{children}</Box>
      </motion.div>
    </Box>
  );
};

const resolveExt = (path: string): string => path;

export default Layout;
