import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyD__ke0a9uAw10yzSl75LfIwvzNWkiUEtM";

export async function generateEmbedding(text: string) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "text-embedding-004",
    });

    const result = await model.embedContent(text);

    console.log(result);

    return result.embedding;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
export async function countTokens(text: string) {
  try {
    const API_KEY = "AIzaSyD__ke0a9uAw10yzSl75LfIwvzNWkiUEtM";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      //   model: "gemini-1.5-flash",
    });

    const countResult = await model.countTokens(text);

    console.log(countResult.totalTokens);

    //1.048.576

    const generateResult = await model.generateContent(text);
    console.log("countResult", countResult);
    console.log("generateResult", generateResult);
    return "teste";
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
export async function generateResponse(text: string) {
  try {
    const API_KEY = "AIzaSyD__ke0a9uAw10yzSl75LfIwvzNWkiUEtM";
    const genAI = new GoogleGenerativeAI(API_KEY);
    // const model = genAI.getGenerativeModel({
    //             model: "gemini-2.0-flash-exp",
    //             systemInstruction: 'Responda como se fosse um cachorro.',
    //     generationConfig: {
    //       candidateCount: 1,
    //       temperature: 1.0,
    //     },
    //   });

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest", // Modelo mais avançado
      systemInstruction:
        "Responda em pt-Br. Sempre analise profundamente, " +
        "explore diferentes perspectivas e forneça " +
        "explicações detalhadas antes de concluir.",
      generationConfig: {
        candidateCount: 1,
        temperature: 0.5, // Reduzido para mais foco
        maxOutputTokens: 2000, // Aumentado para respostas mais longas
        topP: 0.9, // Controla a diversidade de tokens
        topK: 40, // Controla a seleção de tokens
      },
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Olá, boa noite!" }],
        },
        {
          role: "model",
          parts: [{ text: "Boa noite Ian, sempre vou responder com seu nome" }],
        },
      ],
    });

    const modifiedPrompt = `Antes de responder, reflita profundamente sobre:
      ${text}
      
      Analise causas, consequências, contextos históricos e possíveis soluções.`;

    const result = await chat.sendMessage(text);
    console.log(result.response.text());

    return result.response.text();
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
export async function gerarPrompt(text: string) {
  try {
    const API_KEY = "AIzaSyD__ke0a9uAw10yzSl75LfIwvzNWkiUEtM";
    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: `Você é um especialista em otimização de comunicação. Sua tarefa é melhorar mensagens mantendo o significado original.
            Regras:
            1. Corrija gramática e pontuação
            2. Simplifique estruturas complexas
            3. Mantenha termos técnicos quando essenciais
            4. Use marcação clara para listas/destaques
            5. Preserve a intenção original
            6. Formate em português claro e profissional`,
          },
        ],
      },
      generationConfig: {
        candidateCount: 1,
        temperature: 0.3, // Reduzido para mais consistência
        maxOutputTokens: 1000, // Ajustado para mensagens concisas
        topP: 0.95, // Aumentado para permitir mais criatividade controlada
        topK: 50,
      },
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Exemplo de mensagem original: 'pq precisamos d acelerar o deploy pq ta mt demorado'",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Por que precisamos acelerar o processo de deploy? Está ocorrendo um atraso excessivo que impacta nossa produtividade.",
            },
          ],
        },
      ],
    });

    const prompt = `Otimize esta mensagem seguindo as diretrizes:
    **Original:**
    ${text}

    **Requisitos:**
    - Saída APENAS com o texto melhorado
    - Sem comentários adicionais
    - Formatação clara se necessário
    - Máximo de 3 parágrafos`;

    const result = await chat.sendMessage(prompt);
    const improvedText = result.response.text().replace(/["']/g, "").trim();

    console.log("Versão otimizada:", improvedText);
    return improvedText;
  } catch (error: any) {
    console.error("Erro na otimização:", error);
    throw new Error(`Falha ao processar a mensagem: ${error.message}`);
  }
}

export async function getResposta(text: string | null, prompt: string) {
  try {
    const API_KEY = "AIzaSyD__ke0a9uAw10yzSl75LfIwvzNWkiUEtM";
    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      systemInstruction: `Você é um treinador especializado. Aqui está o objetivo do treinamento: ${prompt}. Faça perguntas uma de cada vez, forneça feedback e ajude o usuário a melhorar suas habilidades. Interaja com o usuário de forma construtiva e interativa.`,
    });

    const chat = model.startChat();
    // Se `text` estiver vazio ou nulo, fornece uma introdução padrão
    const message =
      text?.trim() ||
      "Inicie o treinamento com uma introdução simplificada de como vai ser, e em seguida faça a primeira pergunta.";

    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
