const defaultDataset = {
    "init": {
        answers: [
            {content: "和食", nextId: "ja"},
            {content: "洋食", nextId: "western"},
            {content: "中華", nextId: "chinese"},
            {content: "その他", nextId: "other"},
        ],
        question: "今日の気分は？",
    },
    "ja": {
        answers: [
            {content: "肉料理", nextId: "meat"},
            {content: "魚料理", nextId: "fish"},
            {content: "サラダ", nextId: "veg"},
            // {content: "パスタ", nextId: "pasta"},
            {content: "ご飯もの", nextId: "rice"},
            {content: "その他", nextId: "other"}
        ],
        question: "和食ですね。レシピのジャンルはどうされますか？",
    },
    "western": {
        answers: [
            {content: "肉料理", nextId: "meat"},
            {content: "魚料理", nextId: "fish"},
            {content: "サラダ", nextId: "veg"},
            {content: "パスタ", nextId: "pasta"},
            {content: "ご飯もの", nextId: "rice"},
            {content: "その他", nextId: "other"}
        ],
        question: "洋食ですね。レシピのジャンルはどうされますか？",
    },
    "chinese": {
        answers: [
            {content: "肉料理", nextId: "meat"},
            {content: "魚料理", nextId: "fish"},
            {content: "サラダ", nextId: "veg"},
            // {content: "パスタ", nextId: "pasta"},
            {content: "ご飯もの", nextId: "rice"},
            {content: "その他", nextId: "other"}
        ],
        question: "中華ですね。レシピのジャンルはどうされますか？",
    },
    "other": {
        answers: [
            {content: "肉料理", nextId: "meat"},
            {content: "魚料理", nextId: "fish"},
            {content: "サラダ", nextId: "veg"},
            {content: "パスタ", nextId: "pasta"},
            {content: "ご飯もの", nextId: "rice"},
            {content: "その他", nextId: "other"}
        ],
        question: "レシピのジャンルはどうされますか？",
    },
    "meat": {
        answers: [
            {content: "あまり時間がない", nextId: "less"},
            {content: "普通", nextId: "normal"},
            {content: "かなり時間がある", nextId: "much"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "肉料理ですね。調理時間について教えてください",
    },
    "fish": {
        answers: [
            {content: "あまり時間がない", nextId: "less"},
            {content: "普通", nextId: "normal"},
            {content: "かなり時間がある", nextId: "much"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "魚料理ですね。調理時間について教えてください",
    },
    "veg": {
        answers: [
            {content: "あまり時間がない", nextId: "less"},
            {content: "普通", nextId: "normal"},
            {content: "かなり時間がある", nextId: "much"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "野菜料理ですね。調理時間について教えてください",
    },
    "pasta": {
        answers: [
            {content: "あまり時間がない", nextId: "less"},
            {content: "普通", nextId: "normal"},
            {content: "かなり時間がある", nextId: "much"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "パスタ料理ですね。調理時間について教えてください",
    },
    "rice": {
        answers: [
            {content: "あまり時間がない", nextId: "less"},
            {content: "普通", nextId: "normal"},
            {content: "かなり時間がある", nextId: "much"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "丼料理ですね。調理時間について教えてください",
    },
    "other": {
        answers: [
            {content: "あまり時間がない", nextId: "less"},
            {content: "普通", nextId: "normal"},
            {content: "かなり時間がある", nextId: "much"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "調理時間について教えてください",
    },
    "less": {
        answers: [
            {content: "ピックアップレシピを確認する", nextId: "result"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "オススメのレシピをピックアップしました",
    },
    "normal": {
        answers: [
            {content: "ピックアップレシピを確認する", nextId: "result"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "オススメのレシピをピックアップしました",
    },
    "much": {
        answers: [
            {content: "ピックアップレシピを確認する", nextId: "result"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "オススメのレシピをピックアップしました",
    },
    
}

export default defaultDataset