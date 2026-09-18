import { searchProgrammingLanguages } from "../lib/qdrant.js";

const queries = [
  "我想學一個適合人工智慧和資料分析的語言",
  "哪種語言適合開發高併發的雲端服務？",
  "我需要記憶體安全又高效能的系統程式語言",
];

for (const query of queries) {
  console.log(`\n查詢：${query}`);
  const results = await searchProgrammingLanguages(query, 3);

  for (const [index, result] of results.entries()) {
    console.log(`${index + 1}. ${result.language}（相似度：${result.score.toFixed(3)}）`);
    console.log(`   ${result.description}`);
    console.log(`   適用場景：${result.use_cases}`);
  }
}