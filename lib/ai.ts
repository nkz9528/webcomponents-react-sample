import { OpenAI } from "openai";
import {
  ChatCompletion,
  ChatCompletionCreateParamsStreaming,
} from "openai/resources/index.mjs";

interface Props {
  completionsApiCaller: CreateCompletionsApi;
}

async function run({ completionsApiCaller }: Props) {
  const res = await completionsApiCaller({ messages: [], tools: [] });
}

run({
  completionsApiCaller: async (params) => {
    const openai = new OpenAI();
    const result = await openai.chat.completions.create({
      ...params,
      model: "o3-mini",
    });
    return result;
  },
});

type Params = Pick<ChatCompletionCreateParamsStreaming, "messages" | "tools">;

type CreateCompletionsApi = (params: Params) => Promise<ChatCompletion>;
