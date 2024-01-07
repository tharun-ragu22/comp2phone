import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);

  const buttonOnClick = () => {
    //if not logged in, open auth modal
    console.log("pressed button");
    if (!user) {
      setAuthModalState((prev) => ({ open: true, view: "login" }));
    } else {
      router.push(`/files`);
    }
    //else go to upload page
  };
  return (
    <Stack justify="center" align="center" height="100vh">
      <h1 style={{ fontSize: "100pt" }}>Comp2Phone</h1>
      <Button size="lg" onClick={buttonOnClick}>
        Go to your files
      </Button>
    </Stack>
  );
}
