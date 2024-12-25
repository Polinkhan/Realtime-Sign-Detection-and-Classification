import { enqueueSnackbar } from "notistack";
import { useCallback, useState } from "react";

const useFileDrop = (defaultFile: any = undefined) => {
  const [file, setFile] = useState<any>(defaultFile);

  const handleDrop = useCallback(
    (acceptedFile: File[]) => {
      try {
        if (acceptedFile.length) setFile(acceptedFile[0]);
        else enqueueSnackbar("Please select the correct file format.", { variant: "error" });
      } catch (error) {}
    },
    [file]
  );

  const resetFile = () => {
    setFile(defaultFile);
  };

  const getFileAsFormData = () => {
    const formData = new FormData();
    formData.append("package", file);
    return formData;
  };

  return { file, handleDrop, resetFile, getFileAsFormData };
};

export default useFileDrop;
