import { client, DEFAULT_MODEL } from "./lib/openai.js";
import { spinner } from "./utils/spinner.js";
import { toOpenAITool } from "./utils/func-tool.js";
import * as allTools from "./tools/index.js";

const toolList = Object.values(allTools);
const tools = toolList.map(toOpenAITool);
const TOOLS_BY_NAME = Object.fromEntries(toolList.map((tool) => [tool.name, tool]));
const MAX_TOOL_ROUNDS = 8;

const systemInstruction =
  "你是一位可靠的生活資訊助手。當使用者詢問現在時間時，務必呼叫 get_current_time 工具；當使用者詢問天氣時，務必呼叫 get_weather 工具。若同一個問題同時詢問時間與天氣，請在同一輪中呼叫兩個工具，並用繁體中文整合所有結果回答。不要自行猜測即時資訊。";

const testQuestions = [
  "現在幾點？",
  "台北天氣如何？",
  "現在幾點？台北天氣好嗎？",
];

for (const question of testQuestions) {
  const history = [
    { role: "developer", content: systemInstruction },
    { role: "user", content: question },
  ];
  let completed = false;

  console.log(`\n=== 測試問題：${question} ===`);

  for (let round = 1; round <= MAX_TOOL_ROUNDS; round += 1) {
    const spin = spinner("思考中...").start();

    const response = await client.responses.create({
      model: DEFAULT_MODEL,
      input: history,
      tools,
      tool_choice: "auto",
    });

    spin.stop();

    history.push(...response.output);

    const functionCalls = response.output.filter(
      (item) => item.type === "function_call",
    );

    if (functionCalls.length === 0) {
      console.log(response.output_text);
      completed = true;
      break;
    }

    for (const functionCall of functionCalls) {
      const fnName = functionCall.name;
      const tool = TOOLS_BY_NAME[fnName];
      if (!tool) {
        throw new Error(`模型要求了未註冊的工具：${fnName}`);
      }

      const args = tool.parameters.parse(JSON.parse(functionCall.arguments));
      console.log(`\n[呼叫 tool] ${fnName}(${JSON.stringify(args)})`);

      const result = await tool.fn(args);

      history.push({
        type: "function_call_output",
        call_id: functionCall.call_id,
        output: JSON.stringify(result),
      });
    }
  }

  if (!completed) {
    throw new Error(`Tool calling 超過 ${MAX_TOOL_ROUNDS} 輪，已停止執行`);
  }
}
