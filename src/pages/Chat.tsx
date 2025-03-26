import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { mensagens as mensagensData, treinadores } from "../data/mockData";
import { Mensagem, Treinador } from "../types";
import { PageTitle } from "../components/ui/Typography";
import TextField from "../components/ui/TextField";
import Button from "../components/ui/Button";
import { getResposta } from "../services/GeminiService";
import SelectTreinador from "../components/SelectTreinador";
import useSnack from "../hooks/useSnack";

const Chat: React.FC = () => {
  const [mensagens, setMensagens] = useState<Mensagem[]>(mensagensData);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [digitacao, setDigitacao] = useState<boolean>(false); // Controle de "digitação"
  const chatRef = useRef<HTMLDivElement>(null);
  const [treinadorSelecionado, setTreinadorSelecionado] =
    useState<Treinador | null>(null);
  const { showMessage } = useSnack();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensagens]);

  const enviarMensagem = async () => {
    if (!treinadorSelecionado) {
      showMessage("Selecione um treinador para iniciar o treinamento.", "info");
      return;
    }

    if (novaMensagem.trim()) {
      const novaMensagemObj: Mensagem = {
        id: (mensagens.length + 1).toString(),
        texto: novaMensagem,
        remetente: "usuario",
        timestamp: new Date().toISOString(),
      };

      setMensagens([...mensagens, novaMensagemObj]);
      setNovaMensagem("");

      // Simular resposta do treinador
      setDigitacao(true); // Iniciar o indicador de digitação

      const resposta = await getResposta(
        novaMensagem,
        treinadorSelecionado.prompt
      );

      if (resposta && resposta?.trim() !== "") {
        const respostaIA: Mensagem = {
          id: (mensagens.length + 2).toString(),
          texto: resposta,
          remetente: "ia",
          timestamp: new Date().toISOString(),
        };
        setMensagens((msgs) => [...msgs, respostaIA]);
      }

      setDigitacao(false); // Parar o indicador de digitação
    }
  };

  const iniciarTreinamento = async (obj: Treinador) => {
    if (!obj) {
      console.log("caiu");
      return;
    }

    setMensagens([]);
    setNovaMensagem("");
    setDigitacao(true); // Iniciar o indicador de digitação

    const resposta = await getResposta(null, obj.prompt);

    if (resposta && resposta?.trim() !== "") {
      const respostaIA: Mensagem = {
        id: (mensagens.length + 2).toString(),
        texto: resposta,
        remetente: "ia",
        timestamp: new Date().toISOString(),
      };
      setMensagens((msgs) => [...msgs, respostaIA]);
    }

    setDigitacao(false); // Parar o indicador de digitação
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 32px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid item xs={12} sx={{ mb: 2 }}>
        <SelectTreinador
          value={treinadorSelecionado}
          setValue={(obj) => {
            if (obj) {
              setTreinadorSelecionado(obj);
              iniciarTreinamento(obj);
            }
          }}
        />
      </Grid>

      {/* Container principal do chat */}
      <Paper
        elevation={1}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        {/* Área de mensagens com scroll */}
        <Box
          ref={chatRef}
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {mensagens.map((mensagem) => (
            <Box
              key={mensagem.id}
              sx={{
                alignSelf:
                  mensagem.remetente === "usuario" ? "flex-end" : "flex-start",
                maxWidth: "70%",
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  bgcolor:
                    mensagem.remetente === "usuario"
                      ? "primary.main"
                      : "grey.100",
                  color:
                    mensagem.remetente === "usuario" ? "white" : "text.primary",
                }}
              >
                <Box sx={{ mb: 1 }}>{mensagem.texto}</Box>
                <Box
                  sx={{
                    fontSize: "0.75rem",
                    opacity: 0.8,
                  }}
                >
                  {new Date(mensagem.timestamp).toLocaleTimeString()}
                </Box>
              </Paper>
            </Box>
          ))}

          {digitacao && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "20px",
                marginTop: "8px",
                alignSelf: "flex-start",
                maxWidth: "70%",
                width: "100%",
              }}
            >
              <CircularProgress size={15} />

              <Typography
                sx={{ fontSize: "18px", color: "#888", marginTop: "8px" }}
              >
                Analisando...
              </Typography>
            </Box>
          )}
        </Box>

        {/* Área de input fixa na parte inferior */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
          <Stack direction="row" spacing={2}>
            <TextField
              multiline
              maxRows={3}
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              sx={{ flex: 1 }}
            />
            <Button
              onClick={enviarMensagem}
              disabled={!novaMensagem.trim()}
              icon={Send}
            >
              Enviar
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chat;
