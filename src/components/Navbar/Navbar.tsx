import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex bg="white" padding="6px 12px">
      <Flex>
        <Image src="/images/redditFace.svg" height="30px" />
      </Flex>
      <SearchInput />
      <RightContent user={user}/>
    </Flex>
  );
};
export default Navbar;
