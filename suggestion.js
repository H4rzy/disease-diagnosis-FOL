const fs = require("fs");
const readline = require("readline");

const coOccur = {};
async function buildCoOccurrence(filePath) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (!line.trim()) continue;
    const { symptoms } = JSON.parse(line);

    for (let i = 0; i < symptoms.length; i++) {
      const a = symptoms[i];
      coOccur[a] = coOccur[a] || {};
      for (let j = 0; j < symptoms.length; j++) {
        if (i === j) continue;
        const b = symptoms[j];
        coOccur[a][b] = (coOccur[a][b] || 0) + 1;
      }
    }
  }
}

function suggest(symptom, topN = 10) {
  if (!coOccur[symptom]) return [];
  return Object.entries(coOccur[symptom])
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([s]) => s);
}

(async () => {
  await buildCoOccurrence("Disease_Symptom.ndjson");
  console.log(suggest("depression", 10));
})();
