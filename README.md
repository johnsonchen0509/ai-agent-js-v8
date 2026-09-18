# AI Agent 實作工作坊 v8（JavaScript 版）

by eddie@5xcampus.com

JavaScript / Node.js 版的 AI Agent 教學課程，用 OpenAI Node SDK v6
（Responses API）、`@openai/agents`、Qdrant 與 MCP 實作。

## 章節進度（分支）

| 分支 | 主題 |
|------|------|
| `0.1-hello-world` | 起步 |
| `1.1-setup-env` | dotenv 環境變數 |
| `1.2-openai-api` | 第一次 Responses API 呼叫 |
| `1.3-openai-api-loop` | 對話迴圈 |
| `1.4-openai-api-with-memory` | lowdb 對話記憶 |
| `2.1-tool-calling-1` | tool calling 概念 |
| `2.2-tool-calling-2` | 真實 OpenWeather tool |
| `2.3-tool-calling-3` | 多 tool + 有上限的多輪 loop |
| `2.4-tool-calling-youbike` | YouBike API + Haversine |
| `2.5-tool-calling-current-time` | Zod schema 與執行期驗證 |
| `3.1-rag-text-to-vector` | Qdrant + Netflix embedding |
| `3.2-rag-search-text` | 語意搜尋 |
| `3.3-rag-tool` | RAG 包成 tool |
| `3.4-rag-for-pdf` | PDF RAG + recursive splitting |
| `4.1-agents-sdk` | Agents SDK 多 agent + handoff |

## 開發環境

GitHub Codespaces 會依 `.devcontainer/devcontainer.json` 建立 Node.js 22
環境。也可以在本機使用 Node.js 22+。

```bash
npm install
cp .env.example .env
npm start
```

章節 3 起另需 Qdrant；天氣工具另需 OpenWeather API key。金鑰只放在
`.env` 或 Codespaces secrets，不要提交到 Git。

## 作業五：新增 Git 老師

從 `5.1-agents-md` 開始新增 Git 老師，負責 Git、GitHub、分支、合併、rebase 與 merge conflict 問題。班導師透過根目錄的 `AGENTS.md` 判斷相關問題並 handoff 給 Git 老師；天氣與時間等問題則由班導師使用工具處理。

### 三段對話紀錄

**1. Git 問題，交給 Git 老師**

```text
使用者：我想把目前分支合併到 main，遇到 merge conflict 該怎麼處理？
[由 Git 老師 回答]
Git 老師：先用 git status 查看衝突檔案，手動處理衝突標記後執行 git add，最後用 git commit 完成合併。
```

**2. Python 問題，交給原本的 Python 老師，不交給 Git 老師**

```text
使用者：Python 要怎麼讀取 JSON 檔案？
[由 Python 老師 回答]
Python 老師：可以使用 json 模組，透過 with open(...) as file 開啟檔案，再用 json.load(file) 讀取內容。
```

**3. 班導師使用工具回答，不交給 Git 老師**

```text
使用者：現在幾點？
[由 班導師 回答]
班導師：現在是台灣時間下午 4:20，這個答案由 get_current_time 工具查詢取得。
```
