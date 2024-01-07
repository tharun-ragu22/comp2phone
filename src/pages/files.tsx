import FileUploadButton from "@/components/Files/FileUploadButton";
import { auth, firestore } from "@/firebase/clientApp";
import {
  Button,
  Flex,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query } from "firebase/firestore";
import { User } from "firebase/auth";

const files: React.FC = () => {
  const router = useRouter();
  const getUserFiles = async (user: User) => {
    const filesQuery = query(
      collection(firestore, "users/" + user.uid + "/files")
    );

    const filesDocs = await getDocs(filesQuery);

    const filesData = filesDocs.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    console.log(filesData);
  };
  const data = [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
  ];

  const [user, loadingUser] = useAuthState(auth);
  if (user) getUserFiles(user);
  //   useEffect(() => {
  //     if (!user) {
  //       router.push(`/`);
  //     }
  //   }, [user]);[0]._document.data.value.mapValue.fields.fileExt

  return (
    <>
      {user && (
        <Stack height="100vh">
          <Flex
            height="50%"
            width="100%"
            // border="1px solid blue"
            align="center"
            justify="center"
          >
            {/* <Button variant="outline" height="28px" size="lg" onClick={() => {}}>
          Upload
        </Button> */}
            <FileUploadButton user={user} />
          </Flex>
          <Flex
            height="auto"
            width="100%"
            //   border="1px solid red"
            justify="center"
          >
            <TableContainer width="100%">
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>File Name</Th>
                    <Th>Date</Th>
                    <Th>Size</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((item) => (
                    // <Tr>
                    //   <Td>{item}</Td>
                    // </Tr>
                    <Tr>
                      {item.map((item) => (
                        <Td>{item}</Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
                {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
              </Table>
            </TableContainer>
          </Flex>
        </Stack>
      )}
    </>
  );
};
export default files;
