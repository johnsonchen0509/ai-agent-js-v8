import { z } from "zod";
import { defineTool } from "../utils/func-tool.js";

function calculateExpression({ expression }) {
  const tokens = tokenize(expression);
  let position = 0;

  function parseExpression() {
    let value = parseTerm();

    while (tokens[position] === "+" || tokens[position] === "-") {
      const operator = tokens[position];
      position += 1;
      const right = parseTerm();
      value = operator === "+" ? value + right : value - right;
    }

    return value;
  }

  function parseTerm() {
    let value = parsePrimary();

    while (tokens[position] === "*" || tokens[position] === "/") {
      const operator = tokens[position];
      position += 1;
      const right = parsePrimary();

      if (operator === "/" && right === 0) {
        throw new Error("不可以除以零");
      }

      value = operator === "*" ? value * right : value / right;
    }

    return value;
  }

  function parsePrimary() {
    const token = tokens[position];

    if (token === "-") {
      position += 1;
      return -parsePrimary();
    }

    if (token === "(") {
      position += 1;
      const value = parseExpression();

      if (tokens[position] !== ")") {
        throw new Error("括號不完整");
      }

      position += 1;
      return value;
    }

    if (token === undefined || token === ")") {
      throw new Error("算式不完整");
    }

    position += 1;
    return Number(token);
  }

  const result = parseExpression();

  if (position !== tokens.length) {
    throw new Error("算式格式不正確");
  }

  return { expression, result };
}

function tokenize(expression) {
  const tokens = [];
  const tokenPattern = /\s*(\d+(?:\.\d+)?|\.\d+|[()+\-*/])/y;
  let position = 0;

  while (position < expression.length) {
    tokenPattern.lastIndex = position;
    const match = tokenPattern.exec(expression);

    if (!match) {
      throw new Error("算式只能包含數字、小數點、括號與四則運算符號");
    }

    tokens.push(match[1]);
    position = tokenPattern.lastIndex;
  }

  if (tokens.length === 0) {
    throw new Error("算式不可為空白");
  }

  return tokens;
}

export const calculatorTool = defineTool({
  name: "calculate",
  description: "進行數學計算，支援小數、括號與加減乘除四則運算。",
  fn: calculateExpression,
  parameters: z.object({
    expression: z
      .string()
      .min(1)
      .describe('要計算的數學算式，例如 "10 + 5 * 2"'),
  }),
});