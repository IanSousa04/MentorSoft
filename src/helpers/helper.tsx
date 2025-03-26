import React from "react";
import { marked } from "marked";

export const formatarTextoMensagem = (texto: string) => {
  const regex = /(\*{2}(.*?)\*{2})|(\*)/g;

  return texto.split(regex).map((parte, index) => {
    if (!parte) return null; // Ignora partes vazias

    if (parte === "*") {
      return (
        <React.Fragment key={index}>
          <br />
        </React.Fragment>
      ); // Quebra de linha quando há um único asterisco
    } else if (parte.startsWith("**") && parte.endsWith("**")) {
      return (
        <strong key={index}>{parte.slice(2, -2)}</strong> // Texto em negrito
      );
    }

    return <React.Fragment key={index}>{parte}</React.Fragment>;
  });
};


export const renderMarkdown = (markdownText: string) => {

    // Converte o texto markdown em HTML
    return { __html: marked(markdownText) };
  };