export interface IFile {
  id: number;
  url: string;
  original_name: string;
  file_name: string;
  size: number;
}

export interface CreateFilePayload {
  file: any;
}
