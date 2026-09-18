# AI Agent 實作工作坊 v8（JavaScript 版）

by eddie@5xcampus.com

這個 repo 以 Git 分支保存每一個教學進度。切到教材對應的
分支後，開啟 GitHub Codespaces 即可直接使用 Node.js 22。

## 作業二：Function Calling 計算機工具

從 `2.5-tool-calling-current-time` 開始，新增使用 `defineTool` 與 zod schema 定義的 `calculate` 計算機工具，支援數字、小數、括號與四則運算。

### 執行結果

執行 `node function_call.js` 時，AI 成功呼叫計算機工具：

```text
[呼叫 tool] get_current_time({})
[呼叫 tool] get_weather({"city":"Taipei"})
[呼叫 tool] get_nearby_youbike({"lat":25.0478,"lon":121.517,"radius":1000,"available_amount":1,"limit":5})
[呼叫 tool] calculate({"expression":"10 + 5 * 2"})

- **現在時間**：2026 年 9 月 18 日 下午 3:55（台灣時間）
- **台北車站附近天氣**：陰、多雲，約 **29.6°C**，濕度 **60%**
- **YouBike**：有車可租，以下為附近站點：
	- 承德鄭州路口：**13 輛**，約 133 公尺
	- 捷運臺北車站（M2 出口）：**9 輛**，約 210 公尺
	- 臺北轉運站（華陰街）：**14 輛**，約 277 公尺
	- 太原廣場：**18 輛**，約 284 公尺
	- 臺北轉運站：**44 輛**，約 304 公尺
- **計算結果**：`10 + 5 × 2 = 20`
```
