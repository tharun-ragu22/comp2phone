import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Button, Stack } from "@chakra-ui/react";
import { Inter } from "@next/font/google";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);

  const modalState = useRecoilValue(authModalState);
  return (
    <Stack justify="center" align="center" height="100vh">
      <h1 style={{ fontSize: "100pt" }}>Comp2Phone</h1>
      <Button size="lg">Go to your files</Button>
    </Stack>
  );
}
