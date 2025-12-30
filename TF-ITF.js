const fs = require("fs");
const readline = require("readline");

// ===== 1. Đọc file NDJSON =====
async function loadDataset(path) {
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    crlfDelay: Infinity,
  });
  const data = [];
  for await (const line of rl) {
    if (!line.trim()) continue;
    data.push(JSON.parse(line));
  }
  return data;
}

// ===== 2. Tính DF (Document Frequency) =====
function computeDF(data) {
  const DF = {};
  for (const doc of data) {
    const unique = new Set(doc.symptoms);
    for (const s of unique) DF[s] = (DF[s] || 0) + 1;
  }
  return DF;
}

// ===== 3. Recommend triệu chứng đi cùng =====
function recommendCoSymptoms(data, inputSymptom, topN = 10) {
  const DF = computeDF(data);
  const totalDocs = data.length;
  const coScores = {};

  // Tìm các bệnh chứa triệu chứng nhập vào
  const matched = data.filter((d) => d.symptoms.includes(inputSymptom));
  if (matched.length === 0) {
    console.log("❌ Không tìm thấy triệu chứng:", inputSymptom);
    return;
  }

  // Duyệt từng bệnh và đếm các triệu chứng đi kèm
  for (const doc of matched) {
    const total = doc.symptoms.length;
    for (const s of doc.symptoms) {
      if (s === inputSymptom) continue; // bỏ chính nó
      const tf = 1 / total; // mỗi symptom 1 lần
      const idf = Math.log(totalDocs / (DF[s] || 1));
      coScores[s] = (coScores[s] || 0) + tf * idf;
    }
  }

  const sorted = Object.entries(coScores).sort((a, b) => b[1] - a[1]);
  for (const [symptom, score] of sorted.slice(0, topN)) {
    console.log(`${symptom} (score: ${score.toFixed(4)})`);
  }
}

(async () => {
  const data = await loadDataset("Disease_Symptom.ndjson");
  recommendCoSymptoms(data, "shortness of breath", 10);
})();
