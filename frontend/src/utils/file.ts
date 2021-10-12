import { DataUrl } from 'types/auth';

// Adapted from https://stackoverflow.com/a/52311051
export const compressThenConvertToBase64DataUrl = (
  file: File
): Promise<DataUrl> => {
  //   const compressedFile = await imageCompression(file, options);
  const compressedFile = file;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);

    reader.onload = async () => {
      if (reader.result === null) {
        throw new Error('Please re-upload your image file!');
      }

      resolve(reader.result.toString());
    };

    reader.onerror = (error) => reject(error);
  });
};
