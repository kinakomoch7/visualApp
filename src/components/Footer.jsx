import { Container, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Flex bg={"gray.50"}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>&copy; 小出朋希 2023</Text>
      </Container>
    </Flex>
  );
};

export default Footer;
