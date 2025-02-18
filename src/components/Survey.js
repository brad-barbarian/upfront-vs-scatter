import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { section: "business_objectives", text: "What is your primary objective for this media investment?", options: [
      "Maximize cost efficiency and secure premium placements",
      "Maintain flexibility to adapt to market conditions",
      "Drive immediate sales with short-term responsiveness",
      "Ensure brand consistency across a full-year plan",
    ]
  },
  { section: "business_objectives", text: "How predictable is consumer demand in your category?", options: [
      "Highly predictable year-round",
      "Predictable, but with seasonal peaks",
      "Fluctuates significantly based on external factors",
      "Unpredictable and highly dynamic",
    ]
  },
  { section: "business_objectives", text: "How competitive is your category in terms of advertising demand?", options: [
      "Extremely competitive – Many advertisers compete for the same inventory",
      "Moderately competitive – Some competition, but we have opportunities",
      "Not highly competitive – We have flexibility in placement choices",
    ]
  },
  { section: "budget_pricing", text: "How fixed or flexible is your media budget for the upcoming year?", options: [
      "Fixed – We allocate a set amount annually",
      "Mostly fixed – Some room for mid-year adjustments",
      "Flexible – We adjust spending based on performance and opportunities",
    ]
  },
  { section: "budget_pricing", text: "How important is cost predictability in your media buying strategy?", options: [
      "Very important – We need stable, pre-negotiated rates",
      "Somewhat important – We value stability but can tolerate some price shifts",
      "Not important – We are comfortable with fluctuating costs if it means potential savings",
    ]
  },
  { section: "budget_pricing", text: "Would you be willing to take the risk of limited inventory availability if it means securing lower pricing in the market?", options: [
      "Yes – We prioritize cost efficiency over guaranteed access",
      "Maybe – But only if we still maintain access to key placements",
      "No – We need guaranteed access even if it means paying a premium",
    ]
  },
  { section: "campaign_timing", text: "How far in advance do you typically plan your marketing campaigns?", options: [
      "12+ months ahead",
      "6-12 months ahead",
      "Less than 6 months ahead",
      "We adjust in real-time based on data and market conditions",
    ]
  },
  { section: "campaign_timing", text: "How important is it for your brand to have first access to premium placements?", options: [
      "Very important – We need guaranteed high-quality placements",
      "Moderately important – We want good spots but can be flexible",
      "Not important – We can adapt to available inventory",
    ]
  },
  { section: "market_volatility", text: "How much do market conditions impact your media strategy?", options: [
      "Significantly – We need to pivot often",
      "Somewhat – We adjust based on major shifts",
      "Not much – We follow a steady, pre-planned approach",
    ]
  },
  { section: "market_volatility", text: "How open are you to adjusting your media spend in real-time to take advantage of opportunistic pricing?", options: [
      "Very open – We want to capitalize on cost efficiencies whenever possible",
      "Somewhat open – We will adjust if it aligns with our strategy",
      "Not open – We prefer to lock in spend to avoid market fluctuations",
    ]
  },
  { section: "market_volatility", text: "What is your risk tolerance when it comes to securing ad placements?", options: [
      "Low – We need predictability and cost certainty",
      "Moderate – We are willing to balance risk with some flexibility",
      "High – We prioritize agility over pre-planned commitments",
    ]
  }
];

const weights = {
    business_objectives: 0.2,
    budget_pricing: 0.3,
    campaign_timing: 0.3,
    market_volatility: 0.2,
  };
  
const calculateScore = (categories) => {
    let finalScore = 0;
    Object.keys(weights).forEach((category) => {
        if (categories[category].length) {
        const avg = categories[category].reduce((a, b) => a + b, 0) / categories[category].length;
        finalScore += avg * weights[category];
        }
    });
    return Math.round(finalScore);
};

const getResultSummary = (score) => {
    if (score >= 80) {
      return "You strongly align with Upfront buying. You prioritize guaranteed inventory, premium placements, and cost predictability.";
    } else if (score >= 60) {
      return "You lean towards Upfront buying, balancing security with some flexibility.";
    } else if (score >= 40) {
      return "You have a balanced approach, utilizing both Upfront and Scatter buying to optimize costs and flexibility.";
    } else if (score >= 20) {
      return "You lean towards Scatter buying, valuing flexibility and opportunistic pricing.";
    } else {
      return "You strongly align with Scatter buying. You prioritize real-time adjustments, performance optimization, and cost efficiency.";
    }
  };

const Survey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finalScore, setFinalScore] = useState(null);

  const handleAnswer = (index) => {
    const category = questions[currentQuestion].section;
    const updatedAnswers = {
      ...answers,
      [category]: [...(answers[category] || []), (index + 1) * 20],
    };
  
    setAnswers(updatedAnswers);
  
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore(updatedAnswers);
      setFinalScore(score);
    }
  };
  
  

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <AnimatePresence mode="wait">
        {finalScore === null ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-3/4 p-6 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-lg font-bold mb-4">
              {questions[currentQuestion].section}
            </h2>
            <p className="text-xl mb-4">{questions[currentQuestion].text}</p>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="block w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-3/4 p-6 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-lg font-bold mb-4">Final Score: {finalScore}</h2>
            <p className="text-xl">{getResultSummary(finalScore)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );  
};

export default Survey;
