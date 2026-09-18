import { client } from "../lib/openai.js";
import {
  qdrant,
  PROGRAMMING_LANGUAGES_COLLECTION,
  EMBEDDING_DIM,
  EMBEDDING_MODEL,
} from "../lib/qdrant.js";

const languages = [
  {
    language: "JavaScript",
    category: "多用途、動態型程式語言",
    strengths: "可在瀏覽器與 Node.js 執行，擁有龐大的套件生態系，適合快速開發互動功能。",
    use_cases: "前端網頁、後端 API、全端應用、桌面與跨平台應用程式。",
    description: "JavaScript 是網頁平台的核心語言，支援事件驅動與非同步程式設計，也能透過 Node.js 建立伺服器。",
  },
  {
    language: "Python",
    category: "通用型、高階程式語言",
    strengths: "語法簡潔易讀，擁有豐富的資料科學、人工智慧與自動化套件。",
    use_cases: "資料分析、機器學習、網頁後端、自動化腳本與科學計算。",
    description: "Python 強調可讀性與開發效率，標準函式庫完整，初學者容易上手，也常用於人工智慧研究。",
  },
  {
    language: "Ruby",
    category: "物件導向、動態型程式語言",
    strengths: "語法自然且重視開發者幸福感，能用 Ruby on Rails 快速建立資料庫驅動的網站。",
    use_cases: "Web 應用程式、原型開發、網站後端與自動化工具。",
    description: "Ruby 是重視簡潔與表達力的物件導向語言，Ruby on Rails 提供慣例優於設定的 Web 開發框架。",
  },
  {
    language: "Go",
    category: "編譯型、靜態型程式語言",
    strengths: "編譯速度快、部署簡單，內建 goroutine 與 channel，適合高併發服務。",
    use_cases: "雲端服務、微服務、網路工具、命令列工具與基礎設施。",
    description: "Go 由 Google 設計，提供簡潔語法、原生併發模型與單一執行檔部署，適合建立穩定的後端服務。",
  },
  {
    language: "Rust",
    category: "編譯型、系統級程式語言",
    strengths: "透過所有權與借用檢查記憶體安全，兼具接近硬體的效能與現代語言工具。",
    use_cases: "系統軟體、嵌入式程式、高效能服務、WebAssembly 與安全性要求高的工具。",
    description: "Rust 在不依賴垃圾回收器的情況下提供記憶體安全，適合需要高效能與可靠性的系統開發。",
  },
];

function languageToText(language) {
  return [
    language.language,
    language.category,
    language.strengths,
    language.use_cases,
    language.description,
  ].join(" | ");
}

async function recreateCollection() {
  const exists = await qdrant.collectionExists(PROGRAMMING_LANGUAGES_COLLECTION);
  if (exists.exists) {
    await qdrant.deleteCollection(PROGRAMMING_LANGUAGES_COLLECTION);
  }
  await qdrant.createCollection(PROGRAMMING_LANGUAGES_COLLECTION, {
    vectors: { size: EMBEDDING_DIM, distance: "Cosine" },
  });
}

async function main() {
  await recreateCollection();
  console.log(`已建立 collection: ${PROGRAMMING_LANGUAGES_COLLECTION}`);

  const response = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: languages.map(languageToText),
  });

  const points = languages.map((language, index) => ({
    id: index + 1,
    vector: response.data[index].embedding,
    payload: language,
  }));

  await qdrant.upsert(PROGRAMMING_LANGUAGES_COLLECTION, {
    wait: true,
    points,
  });

  console.log(`已寫入 ${points.length} 筆程式語言資料`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});