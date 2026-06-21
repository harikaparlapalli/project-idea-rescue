const express = require("express");
const cors = require("cors"); //allows frontend & backend communication
require("dotenv").config(); //to load environment variables

const app = express(); // create express app
//middleware
app.use(cors()); //reqs from frontend
app.use(express.json()); //json -> js objects

app.use(express.static("public")); //serve frontend files from folder

app.get("/api/test",  (req,res) => { //creates route
    res.json({ //return json
       success : true,
       message : "Project Idea Rescue backend is running!"
    });
});

app.post("/api/generate", (req, res) => {

    try {
        console.log("Request received:", req.body);

        const idea = (req.body && req.body.idea) ? req.body.idea : "Project Idea";
        const audience = (req.body && req.body.audience) ? req.body.audience : "General Users";

        const words = idea.split(" ").filter(Boolean);

        const projectTitle =
            words.length >= 2
                ? words[0] + " " + words[1] + " Hub"
                : (words[0] || "Project") + " Hub";

        const lower = idea.toLowerCase();

        const features = [
            `Solves problems related to ${idea}`,
            "Simple and clean UI",
            "Fast and responsive system",
            "Real-time functionality"
        ];

        if (lower.includes("food")) features.push("Food tracking system");
        if (lower.includes("waste")) features.push("Waste management system");
        if (lower.includes("study")) features.push("Study assistant system");

        // APIs
        const apis = ["REST API"];

        if (lower.includes("weather")) apis.push("OpenWeather API");
        if (lower.includes("location")) apis.push("Google Maps API");
        if (lower.includes("news")) apis.push("News API");

        // Response
        res.json({
            success: true,
            projectTitle,
            problemStatement: `This project helps ${audience} solve: ${idea}.`,
            features,
            apis,
            techStack: [
                "HTML",
                "CSS",
                "JavaScript",
                "Node.js",
                "Express.js"
            ],
            roadmap: [
                "Design UI",
                "Build frontend",
                "Connect backend",
                "Test application",
                "Deploy"
            ],
            resumeDescription:
                `Built a full-stack web app for ${audience} that solves ${idea}.`
        });

    } catch (error) {
        console.error("SERVER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server crashed",
            error: error.message
        });
    }
});
        //instruction sent to AI
//         const prompt = `
//         You are a hackathon mentor.
        
//         Generate a project plan using the following sections:
        
//         Project Title:
//         Problem Statement:
//         Key Features:
//         Suggested APIs:
//         Tech Stack:
//         Development Roadmap:
//         Resume Description:
        
//         Idea: ${idea}
//         Target Audience: ${audience}
//         `;

//         const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
//             {
//                 method: "POST",
//                 headers : {
//                     "Authorization": `Bearer ${process.env.HF_API_KEY}`,
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     inputs: prompt,
//                     parameters: {
//                         max_new_tokens: 400,
//                         temperature: 0.7
//                     }
//                 })
//             }
//         );

//         if(!response.ok) {
//             throw new Error("Hugging face API error");
//         }

//         const data = await response.json();

//         const output = data?.generated_text || data?.[0]?.generated_text || "No response generated";
//         console.log("HF response received successfully");
//         res.json({ //send answer to browser
//             success:true,
//             output:output
//         });
//     } catch(error){ //runs if something breaks
//         console.error("HF error: ", error);

//         const words = idea.split(" ");
//         const projectTitle = words.length >= 2 ? words[0] + " " + words[1] + " " + "Hub" : words[0] + " " + "Hub";
//         const lowerIdea = idea.toLowerCase();
        
//         res.json({
//             success: true,
//             projectTitle,
//             problemStatement: `This system helps ${audience.toLowerCase()} solve problems related to ${idea}.`,

//             features: [
//                 "User-friendly interface",
//                 "Fast and responsive system",
//                 "Real-time data handling", 
//                 `Manages ${idea} efficiently`
//             ],

//             apis: ["REST API",
//                 lowerIdea.includes("weather") ? "OpenWeather API" : "Public Data API"
//             ],

//             techStack: [
//                 "HTML",
//                 "CSS",
//                 "JavaScript",
//                 "Node.js",
//                 "Express.js"
//             ],

//             roadmap: [
//                 "Design UI", 
//                 "Build frontend", 
//                 "Create backend API", 
//                 "Connect frontend + backend",
//                 "Deploy on Render"
//             ],

//             resumeDescription: `Built a full-stack web application for ${audience.toLowerCase()} to solve ${idea}.`
//         });
//     }
// });

const PORT = process.env.PORT || 3000; 
app.listen(PORT,() => { //starts the server
    console.log("App running on http://localhost:"+ PORT);
});
