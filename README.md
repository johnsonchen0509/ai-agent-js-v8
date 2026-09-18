# AI Agent 實作工作坊 v8（JavaScript 版）

by eddie@5xcampus.com

這個 repo 以 Git 分支保存每一個教學進度。切到教材對應的
分支後，開啟 GitHub Codespaces 即可直接使用 Node.js 22。

## 作業四：整合天氣與時間工具

本作業從 `2.5-tool-calling-current-time` 開始，`tools/index.js` 同時 export `weatherTool` 與 `currentTimeTool`。`function_call.js` 的系統指令要求 AI 在詢問現在時間時呼叫 `get_current_time`，詢問天氣時呼叫 `get_weather`；若同時詢問兩者，必須呼叫兩個工具並整合回答。

### 三組測試結果

執行 `node function_call.js` 的結果如下：

#### 1. 現在幾點？

```text
[呼叫 tool] get_current_time({})
現在是台灣時間 2026 年 9 月 18 日下午 4:11。
```

#### 2. 台北天氣如何？

```text
[呼叫 tool] get_weather({"city":"Taipei"})
台北目前約 29.6°C，陰、多雲，濕度約 60%。
```

#### 3. 現在幾點？台北天氣好嗎？

```text
[呼叫 tool] get_current_time({})
[呼叫 tool] get_weather({"city":"Taipei"})
現在是 2026 年 9 月 18 日下午 4:11。
台北目前約 29.6°C、濕度 60%，天氣陰、多雲。整體還可以，但不是晴朗天氣。
```
