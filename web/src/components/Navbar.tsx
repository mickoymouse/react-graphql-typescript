import { Box } from "@chakra-ui/layout";
import { Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <Box ml={"auto"}>
          <NextLink href="/login">
            <Link mr={2}>Login</Link>
          </NextLink>
          <NextLink href="/register">
            <Link> Register</Link>
          </NextLink>
        </Box>
      </>
    );
  } else {
    body = (
      <>
        <Box ml={"auto"} mr={2}>
          {data.me.userName}{" "}
        </Box>
        <Button
          variant="link"
          colorScheme="whiteAlpha"
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </>
    );
  }

  console.log(data);
  return (
    <Flex bg="tomato" p={4}>
      {body}
    </Flex>
  );
};
