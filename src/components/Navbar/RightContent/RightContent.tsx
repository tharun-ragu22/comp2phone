import AuthModal from "@/components/Modal/Auth/AuthModal";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import { User, signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import UserMenu from "./UserMenu";
type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <UserMenu user={user}/> : <AuthButtons />}
        
      </Flex>
    </>
  );
};
export default RightContent;
