const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AQ.Ab8RN6J52YD_he4QvSCyCLx-iSMPBrf8ZIOYPo5nIgid6d_TvA");

async function test() {

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(
        "Say hello"
    );

    console.log(result.response.text());
}

test();