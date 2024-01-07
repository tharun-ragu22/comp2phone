import { FileUpload, fileUploadState } from "@/atoms/fileUploadAtom";
import { firestore, storage } from "@/firebase/clientApp";
import { Button, Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  setDoc,
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
    setLoading(true);
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
      //create collection for files
      const uploadDocRef = await addDoc(
        collection(firestore, "files"),
        newFile
      );
      //already creating collection in uploadDocRef?

      //uploading file to storage
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

        //create posts subcollection under user
        await setDoc(
          doc(firestore, `users/${user?.uid}/files`, uploadDocRef.id),
          {
            fileURL: downloadURL,
            uploadedAt: newFile.uploadedAt,
          }
        );
        console.log(`moved to collection: users/${user?.uid}/files`);
      }
    } catch (error: any) {
      console.log("upload file error", error.message);
    }
    setLoading(false);
  };
  return (
    <Button
      // border="2px dashed"
      // borderRadius={10}
      // p={6}
      // height="25%"
      // width="30%"
      // cursor="pointer"
      // align="center"
      // justify="center"

      onClick={() => selectedFileRef.current?.click()}
      isLoading={loading}
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
    </Button>
  );
};
export default FileUploadButton;
