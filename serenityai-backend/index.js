const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

// Dummy database for storing user data
const userData = {};

// Sample scores for depression, anxiety, and stress
// const depressionScore = 8;
// const anxietyScore = 6;
// const stressScore = 11;

// Function to calculate severity based on scores
function getSeverity(depression, anxiety, stress) {
    const severity = {
        Depression: '',
        Anxiety: '',
        Stress: ''
    };

    // Determine severity for depression
    if (depression >= 14) {
        severity.Depression = 'Extremely Severe';
    } else if (depression >= 11) {
        severity.Depression = 'Severe';
    } else if (depression >= 7) {
        severity.Depression = 'Moderate';
    } else if (depression >= 5) {
        severity.Depression = 'Mild';
    } else {
        severity.Depression = 'Normal';
    }

    // Determine severity for anxiety
    if (anxiety >= 10) {
        severity.Anxiety = 'Extremely Severe';
    } else if (anxiety >= 8) {
        severity.Anxiety = 'Severe';
    } else if (anxiety >= 6) {
        severity.Anxiety = 'Moderate';
    } else if (anxiety >= 4) {
        severity.Anxiety = 'Mild';
    } else {
        severity.Anxiety = 'Normal';
    }

    // Determine severity for stress
    if (stress >= 17) {
        severity.Stress = 'Extremely Severe';
    } else if (stress >= 13) {
        severity.Stress = 'Severe';
    } else if (stress >= 10) {
        severity.Stress = 'Moderate';
    } else if (stress >= 8) {
        severity.Stress = 'Mild';
    } else {
        severity.Stress = 'Normal';
    }

    return severity;
}

function DASS21(obj) {
    var depressionScore = 0;
    var anxietyScore = 0;
    var stressScore = 0;

    for (let key in obj) {
        switch (parseInt(key)) { // Parse key to integer
            case 1:
            case 6:
            case 8:
            case 11:
            case 12:
            case 14:
            case 18:
                stressScore += obj[key];
                break;
            case 2:
            case 4:
            case 7:
            case 9:
            case 15:
            case 19:
            case 20:
                anxietyScore += obj[key];
                break;
            case 3:
            case 5:
            case 10:
            case 13:
            case 16:
            case 17:
            case 21:
                depressionScore += obj[key];
                break;
            default:
                console.log("Value is not between 1 and 21");
        }
    }

    return {
        depressionScore: depressionScore,
        anxietyScore: anxietyScore,
        stressScore: stressScore
    };
}

// Route to send severity and scores to frontend Dashboard
app.get('https://serenityai-42c1-fdgawl6mh-pramaths.vercel.app/dassReport/:userId', (req, res) => {
    const userId = req.params.userId;

    // Check if userData exists for the given userId
    if (userData[userId]) {
        const { depressionScore, anxietyScore, stressScore, depressionSeverity , anxietySeverity, stressSeverity } = userData[userId];
        console.log("userdata",userData[userId])
        res.json({
            depressionSeverity: depressionSeverity,
            anxietySeveritySeverity: anxietySeverity,
            stressSeverity: stressSeverity,
            depressionScore: depressionScore,
            anxietyScore: anxietyScore,
            stressScore: stressScore
        });
    } else {
        res.status(404).json({ error: 'User data not found' });
    }
});

// API endpoint to handle POST requests from bot
app.post('https://serenityaii.onrender.com/api/data', (req, res) => {
    // Assuming the request body contains the object with 42 variables
    const requestData = req.body;
    console.log("user response",req.body)
    const userId = uuidv4(); // Generate unique identifier

    const scores = DASS21(requestData);
    const severity = getSeverity(scores.depressionScore, scores.anxietyScore, scores.stressScore);

    // Store user data in the database
    userData[userId] = { 
        depressionScore: scores.depressionScore, 
        anxietyScore: scores.anxietyScore, 
        stressScore: scores.stressScore, 
        depressionSeverity: severity.Depression, 
        anxietySeverity: severity.Anxiety, 
        stressSeverity: severity.Stress 
    };

    // Send frontend link with userId as query parameter
    const frontendLink = `https://serenityai-42c1-fdgawl6mh-pramaths.vercel.app/dashboard/${userId}`;
    res.json({ link: frontendLink });

});

app.get("/", (req, res) => {
    res.send("Server is Up and Running!");
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});