import React, { useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
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
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
  
    const handleAnswerSelect = (option) => {
      setSelectedAnswer(option);
    };
  
    const handleSubmit = (moveToNext) => {
      if (selectedAnswer !== null) {
        setAnswers([...answers, selectedAnswer]);
        setSelectedAnswer(null);
        setTimeout(() => {
          moveToNext();
        }, 300); // Delay animation to allow smooth transition
      }
    };
  
    return (
      <ReactFullpage
        scrollingSpeed={700}
        verticalCentered={false}
        navigation
        controlArrows={true}
        slidesNavigation={true}
        render={({ fullpageApi }) => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <div className="slide-wrapper">
                {questions.map((question, index) => (
                  <div className="slide" key={index}>
                    <div className="w-3/4 p-6 bg-white shadow-lg rounded-lg text-center transition-transform transform translate-x-0 duration-500 ease-in-out">
                      <h2 className="text-lg font-bold mb-4">{question.section}</h2>
                      <p className="text-xl mb-4">{question.text}</p>
                      <div className="space-y-3">
                        {question.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => handleAnswerSelect(option)}
                            className={`block w-full p-4 rounded-md transition ${selectedAnswer === option ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => handleSubmit(fullpageApi.moveSlideRight)}
                        className={`mt-4 p-4 rounded-md transition ${selectedAnswer === null ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-700'}`}
                        disabled={selectedAnswer === null}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ReactFullpage.Wrapper>
        )}
      />
    );
  };
  
  

export default Survey;
