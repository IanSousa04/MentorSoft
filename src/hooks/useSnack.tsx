import { useSnackContext } from "../contexts/SnackContext";


const useSnack = () => {
  const { showSnack } = useSnackContext();

  const showMessage = (message: string, type: "info" | "error" | "success") => {
    showSnack(message, type);
  };

  return { showMessage };
};

export default useSnack;
