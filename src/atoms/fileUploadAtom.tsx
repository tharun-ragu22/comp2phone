import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type FileUpload = {
  userId: string;
  fileURL: string | null;
  uploadedAt: Timestamp;
  fileName: string;
  fileExt: string;
  byteSize: number;
};

interface FileUploadState {
  files: FileUpload[];
}

const defaultFileUploadState: FileUploadState = {
  files: [],
};

export const fileUploadState = atom<FileUploadState>({
  key: "fileUploadState",
  default: defaultFileUploadState,
});
