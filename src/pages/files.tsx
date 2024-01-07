import FileUploadButton from "@/components/Files/FileUploadButton";
import { auth } from "@/firebase/clientApp";
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

const files: React.FC = () => {
  const router = useRouter();

  const [user, loadingUser] = useAuthState(auth);
  //   useEffect(() => {
  //     if (!user) {
  //       router.push(`/`);
  //     }
  //   }, [user]);

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
                {/* <Thead>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead> */}
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
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
