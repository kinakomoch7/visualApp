import { Container, Heading, Stack } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <Container
      as={Stack}
      maxW={"6xl"}
      py={4}
      direction={{ base: "column", md: "row" }}
      spacing={4}
      justify={{ base: "center", md: "space-between" }}
      align={{ base: "center", md: "center" }}
    >
      <Heading as="h1" size="2xl" noOfLines={1}>
        公金支出情報の可視化
      </Heading>
    </Container>
  );
};

export default Header;
