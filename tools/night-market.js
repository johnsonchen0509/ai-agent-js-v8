const recommendations = {
  台北: {
    classics: ["胡椒餅", "蚵仔煎", "大腸包小腸"],
    route: "先吃鹹食，再用花生冰淇淋潤口，最後以水果或茶收尾。",
  },
  台中: {
    classics: ["鹽酥雞", "雞排", "地瓜球"],
    route: "先從炸物開始，再搭配滷味或烤物，適合多人分食比較。",
  },
  台南: {
    classics: ["棺材板", "牛肉湯", "蝦仁飯"],
    route: "先安排一份熱食主餐，再穿插小份甜食，避免一次吃太飽。",
  },
  高雄: {
    classics: ["木瓜牛奶", "烤魷魚", "臭豆腐"],
    route: "先喝飲品解渴，再吃烤物與炸物，適合邊走邊吃。",
  },
};

export const nightMarketRecommendationTool = {
  type: "function",
  name: "recommend_night_market_food",
  description:
    "根據台灣城市、想吃的類型與飲食限制，推薦夜市小吃組合與逛吃順序。",
  parameters: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "台灣城市，例如台北、台中、台南或高雄",
      },
      foodType: {
        type: "string",
        description: "想吃的類型，例如鹹食、甜食、炸物或在地特色",
      },
      dietaryRestriction: {
        type: "string",
        description: "飲食限制；若沒有請填無",
      },
    },
    required: ["city", "foodType", "dietaryRestriction"],
    additionalProperties: false,
  },
};

export function recommendNightMarketFood({
  city,
  foodType,
  dietaryRestriction,
}) {
  const recommendation = recommendations[city] ?? {
    classics: ["鹽酥雞", "蚵仔煎", "地瓜球"],
    route: "先挑一份主食，再選一到兩種小吃分食，最後補充飲品。",
  };
  const excludedKeywords =
    dietaryRestriction === "無"
      ? []
      : dietaryRestriction.includes("牛")
        ? ["牛"]
        : dietaryRestriction.includes("素")
          ? ["牛", "豬", "雞", "肉", "蚵", "蝦"]
          : [];
  const suggestions = recommendation.classics.filter(
    (item) => !excludedKeywords.some((keyword) => item.includes(keyword)),
  );

  const restrictionNote =
    dietaryRestriction === "無"
      ? "目前沒有特別飲食限制。"
      : `需要留意飲食限制：${dietaryRestriction}。請向攤商確認食材與共用油鍋。`;

  return {
    city,
    requestedFoodType: foodType,
    suggestions,
    eatingRoute: recommendation.route,
    dietaryNote: restrictionNote,
  };
}