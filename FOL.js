const fs = require('fs');
const readline = require('readline');

async function HasSymptom(SymptomSet)
{
    //tao 1 bo doc file
    const rl = readline.createInterface(
        {
            input: fs.createReadStream("Disease_Symptom.ndjson"), // tao thread doc tung dong cho file
            crlfDelay: Infinity // dam bao doc tung dong
        }
    )

    // tao list benh co chung trieu chung
    const diseases = {};
    // now moi dong trong rl dc xem nhu la 1 fiel json

    for await (const line of rl)
    {
        const {disease,symptoms} = JSON.parse(line);

        let count = 0;

        // dem so trieu chung cua benh nhan ma trung voi trieu chung trong dataset
        for (const s of symptoms)
        {
            if(SymptomSet.has(s)) count++;
        }

        // neu trung thi kiem tra
        const rate = count / symptoms.length;
        // neu giong hon 50% thi them vao list
        if(rate >= 0.5)
        {
            if(disease in diseases)
            {
                diseases[disease] += 1;
            }
            else
            {
                diseases[disease] = 1;
            }
        }
    }
    const SortedDiseases = Object.entries(diseases).sort((a,b) => b[1] -a[1]);

    //chi lay 5 thg dau tien de cho vao
    const firstFive = [...SortedDiseases].slice(0, 5);
    //console.log(firstFive);

    return firstFive;
}

// const PatientA = new Set(["anxiety and nervousness", "depressive or psychotic symptoms", "excessive anger", "delusions or hallucinations", "temper problems", "fears and phobias", "low self-esteem", "hysterical behavior"]);
// HasSymptom(PatientA);

module.exports = HasSymptom;