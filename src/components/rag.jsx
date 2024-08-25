import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { formatDocumentsAsString } from "langchain/util/document";
import readline from 'readline';

// Function to process the input string
async function processInputString(inputString) {
  // Create a document from the input string
  const doc = { pageContent: inputString, metadata: {} };

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 8000,
    chunkOverlap: 200,
  });
  
  const splits = await textSplitter.splitDocuments([doc]);

  // Create a simple retriever function
  const retriever = (query) => Promise.resolve(splits);

  // Retrieve and generate using the relevant snippets of the input.
  const qaSystemPrompt = `You are an assistant for question-answering tasks.
Use the following pieces of retrieved context to answer the question.
If you don't know the answer, just say that you don't know.
keep the answer concise but always complete your sentences.
{context}`;

  const qaPrompt = ChatPromptTemplate.fromMessages([
    ["system", qaSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{question}"],
  ]);

  const llm = new ChatGroq({
    apiKey: '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',
    model: "llama3-8b-8192",
    temperature: 0
  });

  const contextualizedQuestion = (input) => {
    if ("chat_history" in input) {
      // Implement logic to contextualize the question based on chat history
      // For simplicity, we'll just return the original question
      return input.question;
    }
    return input.question;
  };

  const ragChain = RunnableSequence.from([
    RunnablePassthrough.assign({
      context: async (input) => {
        const question = await contextualizedQuestion(input);
        const docs = await retriever(question);
        return formatDocumentsAsString(docs);
      },
    }),
    qaPrompt,
    llm,
    new StringOutputParser(),
  ]);

  return ragChain;
}

// Function to get user input
function getUserInput(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Main chatbot function
async function chatbot() {
  console.log("Welcome to the chatbot! Type 'exit' to end the conversation.");
  
  const inputString = ``;
  
  const chain = await processInputString(inputString);
  let chat_history = [];

  while (true) {
    const question = await getUserInput("\nYou: ");
    
    if (question.toLowerCase() === 'exit') {
      console.log("Goodbye!");
      break;
    }

    const response = await chain.invoke({ question, chat_history });
    console.log("Chatbot:", response);

    chat_history.push(["human", question]);
    chat_history.push(["ai", response]);
  }
}

// Run the chatbot
chatbot().catch(console.error);