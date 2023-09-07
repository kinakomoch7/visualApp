import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <div className="content">
      <Flex>
        <Heading as="h1" size="2xl" noOfLines={1}>
          公金支出情報の可視化
        </Heading>
      </Flex>
    </div>
  );
};

export default Header;
