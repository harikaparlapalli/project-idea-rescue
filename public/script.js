var outputSection = document.getElementById("output-section");

//Button
var generateBtn = document.getElementById("generate-btn");

//Inputs
var ideaInput = document.getElementById("idea-input");
var audienceSelect = document.getElementById("audience");

//Output sections
var projectTitle = document.getElementById("project-title");
var problemStatement = document.getElementById("problem-statement");
var features = document.getElementById("features");
var apis = document.getElementById("apis");
var techStack = document.getElementById("tech-stack");
var roadmap = document.getElementById("roadmap");
var resumeDescription = document.getElementById("resume-description");

generateBtn.addEventListener("click", generateProject);

//runs when generate button is called
async function generateProject() {
    const idea = ideaInput.value.trim(); //get text entered by user
    const audience = audienceSelect.value; //get selected audience from dropdown

    //Prevent empty submissions
    if(!idea){
        alert("Please enter an idea.");
        return;
    }

    try {
        //Change button text while waiting for AI response
        generateBtn.innerText = "Generating...";

        //Send request to backend
        const response = await fetch("/api/generate", {
            //POST because we're sending data
            method : "POST",

            //Tell backend that we're sending JSON
            headers: {
                "Content-Type" : "application/json"
            },

            //Converts JS object into JSON string
            body: JSON.stringify({
                idea: idea,
                audience: audience
            })
        });

        //Convert backend response into JS object
        const data = await response.json();

        //Show output section
        outputSection.style.display = "block";

        //Project title
        projectTitle.innerHTML = data.projectTitle;

        //Problem statement
        problemStatement.innerHTML = data.problemStatement;
        resumeDescription.innerHTML = data.resumeDescription;
        //Features
        features.innerHTML = "";
        if(data.features){
            data.features.forEach(item => {
            features.innerHTML += `<li>${item}</li>`;
        });
    }

        //APIs
        apis.innerHTML = "";
        if(data.pais){
            data.apis.forEach(item => {
            apis.innerHTML += `<li>${item}</li>`;
        });
    }

        //Tech stack
        techStack.innerHTML = "";
        if(data.techStack){
            data.techStack.forEach(item => {
            techStack.innerHTML += `<li>${item}</li>`;
        });
    }

        //Roadmap
        roadmap.innerHTML = "";
        if(data.roadmap){
            data.roadmap.forEach(item => {
            roadmap.innerHTML += `<li>${item}</li>`;
        });
    }

        //Restore button
        generateBtn.innerText = "Generate Project";
    //     //Display generated content
    //     projectTitle.innerHTML = data.output;
    //     outputSection.style.display = "block";

    //     //Restore button text
    //     generateBtn.innerText = "Generate Project";
    } catch(error){
        console.error(error);
        alert("Something went wrong. Check server console.");
        generateBtn.innerText = "Generate Project";
    }
}


