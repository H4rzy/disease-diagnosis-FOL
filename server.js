const express = require('express');

const diagnose = require('./FOL');

const cors = require('cors');

const app = express();

const port = 3000;

app.use(cors());

app.use(express.json());

app.post("/diagnose", async (req,res) => 
{
    try{
        const data = req.body;

        if(!data)
            return res.status(400).json({error: "dữ liệu ko hộp lệ!"});

        const symptomSet = new Set(data.symptoms)

        const result = await diagnose(symptomSet);

        res.json({result});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: "lỗi server?"});
    }
});

app.listen(port,() =>
{
    console.log(`server đang chạy tại http://localhost:${port}`);
});
