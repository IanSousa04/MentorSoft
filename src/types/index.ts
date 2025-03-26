export interface Treinador {
  id: string;
  nome: string;
  prompt: string;
  dataCriacao: string;
}

export interface Pergunta {
  id: string;
  texto: string;
  treinadorId: string;
}

export interface Mensagem {
  id: string;
  texto: string;
  remetente: 'usuario' | 'ia';
  timestamp: string;
}

export interface Relatorio {
  pontuacao: number;
  totalPerguntas: number;
  respostasCorretas: number;
  tempoTotal: string;
  feedback: string;
}