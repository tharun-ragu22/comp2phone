import { FileUpload, fileUploadState } from "@/atoms/fileUploadAtom";
import { firestore, storage } from "@/firebase/clientApp";
import { Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { ChangeEvent, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

type FileUploadButtonProps = {
  user: User;
};

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ user }) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>();

  //   const setFileUploadState = useSetRecoilState(fileUploadState)
  const onFileChangeCapture = async (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      console.log("got here");
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };

    const newFile: FileUpload = {
      userId: user?.uid,
      uploadedAt: serverTimestamp() as Timestamp,
      fileURL: null, // trying this for now
    };

    try {
      const uploadDocRef = await addDoc(
        collection(firestore, "files"),
        newFile
      );
      console.log("HERE IS NEW UPLOAD ID", uploadDocRef.id);
      if (selectedFile && user) {
        console.log("found a file");
        const uploadRef = ref(storage, `files/${user.uid}/${uploadDocRef.id}`);
        await uploadString(uploadRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(uploadRef);
        await updateDoc(uploadDocRef, {
          fileURL: downloadURL,
        });
        console.log("HERE IS DOWNLOAD URL", downloadURL);
      }
    } catch (error: any) {
      console.log("upload file error", error.message);
    }
  };
  return (
    <Flex
      border="2px dashed"
      borderRadius={10}
      p={6}
      height="25%"
      width="30%"
      cursor="pointer"
      align="center"
      justify="center"
      onClick={() => selectedFileRef.current?.click()}
    >
      <Text fontSize="25pt" fontWeight={400}>
        Upload
      </Text>
      <input
        ref={selectedFileRef}
        type="file"
        onChangeCapture={onFileChangeCapture}
        hidden
      />
    </Flex>
  );
};
export default FileUploadButton;
