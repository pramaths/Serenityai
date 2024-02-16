const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const Chart = require('chart.js');
const path = require('path');

// Sample scores for depression, anxiety, and stress
const depressionScore = 8;
const anxietyScore = 6;
const stressScore = 11;

// Calculate severity
const severity = calculateSeverity(depressionScore, anxietyScore, stressScore);

// Function to calculate severity based on scores
function calculateSeverity(depressionScore, anxietyScore, stressScore) {
    if (depressionScore >= 14 || anxietyScore >= 10 || stressScore >= 17) {
        return "Extremely Severe";
    } else if (depressionScore >= 11 || anxietyScore >= 8 || stressScore >= 13) {
        return "Severe";
    } else if (depressionScore >= 7 || anxietyScore >= 6 || stressScore >= 10) {
        return "Moderate";
    } else if (depressionScore >= 5 || anxietyScore >= 4 || stressScore >= 8) {
        return "Mild";
    } else {
        return "Normal";
    }
}

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the chart
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Route to get severity and scores
app.get('/data', (req, res) => {
    res.json({
        severity: severity,
        depressionScore: depressionScore,
        anxietyScore: anxietyScore,
        stressScore: stressScore
    });
});

// function DASS21(obj){
//     var depressionScore = 0;
//     var anxietyScore = 0;
//     var stressScore = 0;

//     for (let key in obj) {
//         // console.log(key + ': ' + myObject[key]);
//         switch (key) {
//             case 1:
//                 stressScore += obj[key];
//                 break;
//             case 2:
//                 anxietyScore += obj[key];
//                 break;
//             case 3:
//                 depressionScore += obj[key];
//                 break;
//             case 4:
//                 anxietyScore += obj[key];
//                 break;
//             case 5:
//                  depressionScore += obj[key];
//                 break;
//             case 6:
//                 stressScore += obj[key];
//                 break;
//             case 7:
//                 anxietyScore += obj[key];
//                 break;
//             case 8:
//                 stressScore += obj[key];
//                 break;
//             case 9:
//                 anxietyScore += obj[key];
//                 break;
//             case 10:
//                 depressionScore += obj[key];
//                 break;
//             case 11:
//                 stressScore += obj[key];
//                 break;
//             case 12:
//                 stressScore += obj[key];
//                 break;
//             case 13:
//                 depressionScore += obj[key];
//                 break;
//             case 14:
//                 stressScore += obj[key];
//                 break;
//             case 15:
//                 anxietyScore += obj[key];
//                 break;
//             case 16:
//                 depressionScore += obj[key];
//                 break;
//             case 17:
//                 depressionScore += obj[key];
//                 break;
//             case 18:
//                 stressScore += obj[key];
//                 break;
//             case 19:
//                 anxietyScore += obj[key];
//                 break;
//             case 20:
//                 anxietyScore += obj[key];
//                 break;
//             case 21:
//                 depressionScore += obj[key];
//                 break;
//             default:
//                 console.log("Value is not between 1 and 21");
//         }
        
//       }
    
// }

app.use(express.json());

// API endpoint to handle POST requests
app.post('/api/data', (req, res) => {
  // Assuming the request body contains the object with 42 variables
  const requestData = req.body;

  // Here you can manipulate or process the requestData as needed
  // For demonstration purposes, we'll simply send back the received data

  res.json({ receivedData: requestData });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});