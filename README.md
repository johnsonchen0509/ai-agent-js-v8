# AI Agent 實作工作坊 v8（JavaScript 版）

by eddie@5xcampus.com

這個 repo 以 Git 分支保存每一個教學進度。切到教材對應的
分支後，開啟 GitHub Codespaces 即可直接使用 Node.js 22。

## 作業三：程式語言迷你知識庫

本作業從 `3.2-rag-search-text` 開始，建立獨立的 `programming_languages` Qdrant collection，收錄 JavaScript、Python、Ruby、Go、Rust 共 5 筆程式語言介紹。

灌資料指令：

```bash
node scripts/embed-programming-languages.js
```

執行結果：

```text
已建立 collection: programming_languages
已寫入 5 筆程式語言資料
```

搜尋測試指令：

```bash
node scripts/search-programming-languages.js
```

### 三組實際搜尋結果

**查詢一：我想學一個適合人工智慧和資料分析的語言**

1. Python，相似度：0.559
2. Ruby，相似度：0.421
3. Rust，相似度：0.417

**查詢二：哪種語言適合開發高併發的雲端服務？**

1. Go，相似度：0.583
2. JavaScript，相似度：0.513
3. Rust，相似度：0.439

**查詢三：我需要記憶體安全又高效能的系統程式語言**

1. Rust，相似度：0.651
2. Go，相似度：0.477
3. JavaScript，相似度：0.467
