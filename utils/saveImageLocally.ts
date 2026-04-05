import { Directory, File, Paths } from "expo-file-system";

export const saveImageLocally = async (pickerUri: string) => {
  if (!pickerUri) return "";

  const datenumber = new Date().getTime();
  const uploadedFile = new File(pickerUri);
  const directory = new Directory(Paths.document);
  const fileName = `bike_${datenumber}.jpg`;
  const newFile = new File(directory, fileName);

  uploadedFile.copy(newFile);

  return newFile.uri;
};
