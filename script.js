import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  push,
  ref,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyATr5N8pzzV4ZRdP2V4ZZgXmdEn47rFQjk",
  authDomain: "shindan-mbti-20260524.firebaseapp.com",
  databaseURL: "https://shindan-mbti-20260524-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shindan-mbti-20260524",
  storageBucket: "shindan-mbti-20260524.firebasestorage.app",
  messagingSenderId: "716187797384",
  appId: "1:716187797384:web:c04d3aafe806a24b255c3d",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const questions = [
  {
    text: "週末の予定を決めるとき、どちらに近いですか？",
    choices: [
      { text: "人と会う予定を入れると元気が出る", trait: "E" },
      { text: "ひとりで整える時間があると回復する", trait: "I" },
    ],
  },
  {
    text: "新しい企画を考えるとき、まず見るのは？",
    choices: [
      { text: "今ある事実、数字、具体例", trait: "S" },
      { text: "可能性、流れ、まだ形になっていない仮説", trait: "N" },
    ],
  },
  {
    text: "チームで意見が割れたとき、重視しやすいのは？",
    choices: [
      { text: "筋が通っているか、判断基準が明確か", trait: "T" },
      { text: "関係性や納得感が保たれているか", trait: "F" },
    ],
  },
  {
    text: "旅行前の準備はどちら寄りですか？",
    choices: [
      { text: "宿、移動、持ち物を先に固めておきたい", trait: "J" },
      { text: "現地で気分に合わせて動ける余白がほしい", trait: "P" },
    ],
  },
  {
    text: "会議でアイデアが出た瞬間、あなたは？",
    choices: [
      { text: "口に出しながら考えがまとまる", trait: "E" },
      { text: "一度持ち帰ると良い案が浮かぶ", trait: "I" },
    ],
  },
  {
    text: "説明を受けるなら、どちらが助かりますか？",
    choices: [
      { text: "手順や実例から順番に聞きたい", trait: "S" },
      { text: "全体像やコンセプトから掴みたい", trait: "N" },
    ],
  },
  {
    text: "フィードバックをするとき、自然に出やすいのは？",
    choices: [
      { text: "改善点を率直に整理する", trait: "T" },
      { text: "受け取りやすさと言葉の温度を調整する", trait: "F" },
    ],
  },
  {
    text: "作業の進め方はどちらがしっくりきますか？",
    choices: [
      { text: "締切から逆算して段取りを作る", trait: "J" },
      { text: "試しながら良い形を探っていく", trait: "P" },
    ],
  },
  {
    text: "初対面の場では、どちらが多いですか？",
    choices: [
      { text: "自分から会話の糸口を作る", trait: "E" },
      { text: "場の空気を見てから話し始める", trait: "I" },
    ],
  },
  {
    text: "仕事でテンションが上がる瞬間は？",
    choices: [
      { text: "実装や運用がきれいに回り始めたとき", trait: "S" },
      { text: "未来の大きな構想が見えたとき", trait: "N" },
    ],
  },
  {
    text: "難しい決断をするとき、最後に頼るのは？",
    choices: [
      { text: "比較表、リスク、合理性", trait: "T" },
      { text: "大切にしたい価値観や人への影響", trait: "F" },
    ],
  },
  {
    text: "日々のタスク管理はどちら寄りですか？",
    choices: [
      { text: "完了チェックが増えると気持ちいい", trait: "J" },
      { text: "その日の流れに合わせて組み替えたい", trait: "P" },
    ],
  },
];

const resultProfiles = {
  INTJ: ["戦略を描く設計者", "静かに全体像を読み、長期戦で勝ち筋を作るタイプ。理想を現実に落とす設計力が強みです。"],
  INTP: ["仕組みを解く探究者", "なぜそうなるのかを掘り下げ、独自のロジックで世界を理解するタイプ。自由度の高い課題で伸びます。"],
  ENTJ: ["前に進める指揮官", "ゴールから逆算して人と物事を動かすタイプ。判断と実行の速度が武器です。"],
  ENTP: ["可能性を広げる発明家", "新しい切り口を見つけ、議論しながらアイデアを磨くタイプ。変化のある環境で輝きます。"],
  INFJ: ["意味を見つめる案内人", "人や社会の奥にあるテーマを感じ取り、静かに方向づけるタイプ。深い共感と構想力があります。"],
  INFP: ["価値を守る理想家", "自分なりの美意識や信念を大切にするタイプ。言葉や表現で人の心を動かせます。"],
  ENFJ: ["人をつなぐ伴走者", "周囲の感情と可能性を見ながら、チームを前向きにするタイプ。育成や調整が得意です。"],
  ENFP: ["熱を生むアイデアメーカー", "人と可能性に反応し、場にエネルギーを持ち込むタイプ。新規企画の初速を作れます。"],
  ISTJ: ["信頼を積む実務家", "約束、手順、品質を大切にするタイプ。安定した運用と継続改善で力を発揮します。"],
  ISFJ: ["場を支える守り手", "細かな変化に気づき、必要な支援をそっと差し出すタイプ。安心できる環境づくりが得意です。"],
  ESTJ: ["現場を締める管理者", "ルールと成果を結びつけ、物事を確実に前進させるタイプ。実行管理に強さがあります。"],
  ESFJ: ["空気を整える調整役", "人の状態を見ながら、チームが動きやすい形を作るタイプ。実務と気配りの両方が得意です。"],
  ISTP: ["手を動かす解析者", "状況を冷静に観察し、必要なところだけ鋭く直すタイプ。実践的な問題解決に強いです。"],
  ISFP: ["感性で選ぶ表現者", "自分の感覚に忠実で、自然体の魅力を持つタイプ。美しさや心地よさへの感度があります。"],
  ESTP: ["流れを掴む実践家", "目の前の状況を読み、すばやく試して突破するタイプ。現場対応と交渉に強みがあります。"],
  ESFP: ["場を明るくする演出家", "今この瞬間の楽しさや人の反応を大切にするタイプ。体験を魅力的にする力があります。"],
};

const traitLabels = {
  EI: ["E", "I", "外向", "内向"],
  SN: ["S", "N", "現実", "直感"],
  TF: ["T", "F", "論理", "感情"],
  JP: ["J", "P", "計画", "柔軟"],
};

const state = {
  index: 0,
  answers: [],
  participantName: "",
  lastResult: null,
};

const nameForm = document.querySelector("#nameForm");
const nameInput = document.querySelector("#nameInput");
const quizHeading = document.querySelector("#quizHeading");
const currentQuestion = document.querySelector("#currentQuestion");
const totalQuestions = document.querySelector("#totalQuestions");
const progressBar = document.querySelector("#progressBar");
const questionCard = document.querySelector("#questionCard");
const questionText = document.querySelector("#questionText");
const choices = document.querySelector("#choices");
const backButton = document.querySelector("#backButton");
const resetButton = document.querySelector("#resetButton");
const resultPanel = document.querySelector("#resultPanel");
const resultCode = document.querySelector("#resultCode");
const resultTitle = document.querySelector("#resultTitle");
const resultSummary = document.querySelector("#resultSummary");
const traitGrid = document.querySelector("#traitGrid");
const saveStatus = document.querySelector("#saveStatus");
const restartButton = document.querySelector("#restartButton");
const copyButton = document.querySelector("#copyButton");
const copyStatus = document.querySelector("#copyStatus");

totalQuestions.textContent = questions.length;
backButton.disabled = true;

function sanitizeName(value) {
  return value.trim().replace(/\s+/g, " ").slice(0, 40);
}

function showNameForm() {
  quizHeading.textContent = "まずは名前を入力してください";
  currentQuestion.textContent = "0";
  progressBar.style.width = "0%";
  nameForm.hidden = false;
  questionCard.hidden = true;
  resultPanel.hidden = true;
  backButton.disabled = true;
  copyStatus.textContent = "";
  saveStatus.textContent = "";
}

function renderQuestion() {
  const question = questions[state.index];
  const progress = (state.index / questions.length) * 100;

  quizHeading.textContent = `${state.participantName}さん、直感で近い方を選んでください`;
  currentQuestion.textContent = Math.min(state.index + 1, questions.length);
  progressBar.style.width = `${progress}%`;
  questionText.textContent = question.text;
  choices.replaceChildren();
  nameForm.hidden = true;
  questionCard.hidden = false;
  resultPanel.hidden = true;
  copyStatus.textContent = "";

  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice.text;
    button.addEventListener("click", () => selectAnswer(choice.trait));
    choices.append(button);
  });

  backButton.disabled = state.index === 0;
}

function selectAnswer(trait) {
  state.answers[state.index] = trait;
  state.index += 1;

  if (state.index >= questions.length) {
    renderResult();
    return;
  }

  renderQuestion();
}

function calculateResult() {
  const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  state.answers.forEach((trait) => {
    counts[trait] += 1;
  });

  const code = [
    counts.E >= counts.I ? "E" : "I",
    counts.S >= counts.N ? "S" : "N",
    counts.T >= counts.F ? "T" : "F",
    counts.J >= counts.P ? "J" : "P",
  ].join("");

  return { code, counts };
}

function buildResultPayload(code, title, summary, counts) {
  return {
    name: state.participantName,
    type: code,
    title,
    summary,
    counts,
    answers: state.answers,
    questionCount: questions.length,
    userAgent: navigator.userAgent,
    createdAt: serverTimestamp(),
  };
}

async function saveResult(payload) {
  saveStatus.className = "save-status is-saving";
  saveStatus.hidden = true;
  saveStatus.textContent = "";

  try {
    const saved = await push(ref(database, "results"), payload);
    state.lastResult = { ...payload, id: saved.key };
    saveStatus.className = "save-status is-saved";
    saveStatus.textContent = "";
  } catch (error) {
    console.error("Failed to save result", error);
    state.lastResult = payload;
    saveStatus.className = "save-status is-error";
    saveStatus.hidden = false;
    saveStatus.textContent = "結果の記録に失敗しました。時間をおいてもう一度お試しください。";
  }
}

function renderResult() {
  const { code, counts } = calculateResult();
  const [title, summary] = resultProfiles[code];
  const namedTitle = `${state.participantName}さんの診断結果は ${code}（${title}）です`;

  progressBar.style.width = "100%";
  currentQuestion.textContent = questions.length;
  quizHeading.textContent = "診断が完了しました";
  questionText.textContent = "";
  choices.replaceChildren();
  questionCard.hidden = true;
  backButton.disabled = false;

  resultCode.textContent = code;
  resultTitle.textContent = namedTitle;
  resultSummary.textContent = summary;
  traitGrid.replaceChildren();

  Object.entries(traitLabels).forEach(([pair, labels]) => {
    const [left, right, leftName, rightName] = labels;
    const total = counts[left] + counts[right];
    const leftPercent = total === 0 ? 50 : Math.round((counts[left] / total) * 100);
    const rightPercent = total === 0 ? 50 : Math.round((counts[right] / total) * 100);
    const isRight = counts[right] > counts[left];
    const selectedSide = isRight ? rightName : leftName;
    const selectedPercent = isRight ? rightPercent : leftPercent;

    const row = document.createElement("div");
    row.className = "trait-row";
    row.innerHTML = `
      <span>${left}</span>
      <span class="trait-meter" aria-label="${pair}: ${selectedSide}">
        <span class="trait-fill${isRight ? " is-right" : ""}" style="width: ${selectedPercent}%"></span>
      </span>
      <span>${right}</span>
    `;
    traitGrid.append(row);
  });

  resultPanel.hidden = false;
  resultPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  saveResult(buildResultPayload(code, title, summary, counts));
}

function resetQuiz() {
  state.index = 0;
  state.answers = [];
  state.participantName = "";
  state.lastResult = null;
  nameInput.value = "";
  showNameForm();
}

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = sanitizeName(nameInput.value);

  if (!name) {
    nameInput.focus();
    return;
  }

  state.participantName = name;
  state.index = 0;
  state.answers = [];
  renderQuestion();
});

backButton.addEventListener("click", () => {
  if (state.index === 0) return;
  state.index -= 1;
  renderQuestion();
});

resetButton.addEventListener("click", resetQuiz);
restartButton.addEventListener("click", resetQuiz);

copyButton.addEventListener("click", async () => {
  const { code } = calculateResult();
  const [title, summary] = resultProfiles[code];
  const text = `${state.participantName}さんの診断結果は ${code}（${title}）です。\n${summary}`;

  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "コピーしました。";
  } catch {
    copyStatus.textContent = "コピーできませんでした。結果テキストを選択してコピーしてください。";
  }
});

showNameForm();
