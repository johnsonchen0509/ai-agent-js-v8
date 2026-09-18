import { input } from "@inquirer/prompts";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "./config.js";
import { initMessage, addMessage, getMessages } from "./db/messages.js";
import {
  nightMarketRecommendationTool,
  recommendNightMarketFood,
} from "./tools/night-market.js";

const client = new OpenAI({ apiKey: OPENAI_API_KEY });
const tools = [nightMarketRecommendationTool];

await initMessage(
  "你是台灣夜市小吃達人阿夜，背景是走遍台灣各地夜市、熟悉在地攤商與飲食文化的美食顧問。你專門介紹夜市小吃、推薦適合的攤位類型與安排逛夜市路線。請用繁體中文回答，語氣熱情親切、具體實用，會先詢問城市、口味、預算或飲食限制，再給出清楚的理由與替代選擇。不要捏造確定存在的店家地址；若需要即時店家資訊，請說明只能提供一般性建議。"
);

async function getAssistantReply() {
  let inputItems = getMessages();

  while (true) {
    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: inputItems,
      tools,
    });

    const functionCalls = response.output.filter(
      (item) => item.type === "function_call",
    );

    if (functionCalls.length === 0) {
      return response.output_text;
    }

    const toolOutputs = functionCalls.map((functionCall) => {
      const argumentsObject = JSON.parse(functionCall.arguments);
      const result = recommendNightMarketFood(argumentsObject);

      return {
        type: "function_call_output",
        call_id: functionCall.call_id,
        output: JSON.stringify(result),
      };
    });

    inputItems = [...inputItems, ...response.output, ...toolOutputs];
  }
}

try {
  while (true) {
    const userQuestion = (
      await input({ message: "請輸入你的問題：" })
    ).trim();

    if (userQuestion === "") continue;
    if (userQuestion.toLowerCase() === "exit") {
      console.log("再會~");
      break;
    }

    await addMessage(userQuestion);

    const content = await getAssistantReply();
    console.log(content);

    await addMessage(content, "assistant");
  }
} catch (err) {
  if (err.name === "ExitPromptError") {
    console.log("\n再會~");
  } else {
    throw err;
  }
}
