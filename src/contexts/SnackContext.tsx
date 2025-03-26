import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

// Definir o tipo de mensagem do snack
type SnackType = "info" | "error" | "success";

interface SnackMessage {
  message: string;
  type: SnackType;
}

interface SnackContextType {
  showSnack: (message: string, type: SnackType) => void;
  hideSnack: () => void;
}

const SnackContext = createContext<SnackContextType | undefined>(undefined);

export const useSnackContext = () => {
  const context = useContext(SnackContext);
  if (!context) {
    throw new Error("useSnackContext must be used within a SnackProvider");
  }
  return context;
};

// Componente Provider que gerencia o estado global
export const SnackProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [snack, setSnack] = useState<SnackMessage | null>(null);

  const showSnack = (message: string, type: SnackType) => {
    setSnack({ message, type });
  };

  const hideSnack = () => {
    setSnack(null);
  };

  return (
    <SnackContext.Provider value={{ showSnack, hideSnack }}>
      {children}

      {/* Snackbar global */}
      {snack && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={hideSnack}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={hideSnack} severity={snack.type} sx={{ width: "100%",borderRadius: 5,boxShadow: 2,fontSize: "14px" }} >
            {snack.message}
          </Alert>
        </Snackbar>
      )}
    </SnackContext.Provider>
  );
};
