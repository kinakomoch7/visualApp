import { QuestionIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Overview = () => {
  return (
    <>
      <Text fontSize="xl" maxW={"6xl"} py={4}>
        東京都の令和4年度1月〜3月の歳出予算の支払情報の可視化
      </Text>
      <Flex alignItems="center">
        <Text fontSize="-moz-initial">
          下記の選択した部局対応した以下のグラフが表示されます。
        </Text>
        <Popover>
          <PopoverTrigger>
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme="teal"
              aria-label="Done"
              fontSize="20px"
              icon={<QuestionIcon />}
              size={40}
            />
          </PopoverTrigger>
          <PopoverContent w={500}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>東京都庁の部局とは？</PopoverHeader>
            <PopoverBody>
              <Text>
                部局とは組織の単位であり、 今回は局＞部＞課の順となります。
              </Text>
              <Text>ただし、立場により順番が異なる場合があります。</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <Text>・月毎の局の総支出額の変化を表した折れ線グラフ（下部）</Text>
      <Text>・その管理下の部・課の合計金額を円グラフ（右上）</Text>
      <Text> ・支払い品目の頻度を表したワードクラウド（右下）</Text>
    </>
  );
};

export default Overview;
