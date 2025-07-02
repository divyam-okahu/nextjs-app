import { setupMonocle } from "monocle2ai";

export function register() {
  console.log("Registering instrumentation");
  setupMonocle("chatbot-coffee-vercel");
  console.log("Instrumentation registered");
}
