const LLAMA_API_URL = 'https://api.llama-api.com'; // Replace with actual Llama API endpoint
const LLAMA_API_KEY = process.env.REACT_APP_LLAMA_API_KEY;  // Replace with your Llama API key

export const aiService = {
  getInvestmentRecommendations: async (portfolio, riskProfile) => {
    try {
      // Check if portfolio and stocks exist
      if (!portfolio || !portfolio.stocks) {
        return "No portfolio data available for recommendations.";
      }

      // Format portfolio data for better prompt
      const portfolioSummary = portfolio.stocks.map(stock => ({
        symbol: stock.symbol,
        shares: stock.shares,
        averagePrice: stock.averageBuyPrice,
        totalInvestment: stock.totalInvestment
      }));

      const prompt = `As a financial advisor, please analyze this investment portfolio and provide specific recommendations:

Portfolio Summary:
${JSON.stringify(portfolioSummary, null, 2)}

Risk Profile: ${riskProfile}

Please provide:
1. Analysis of current portfolio diversity
2. Specific recommendations for rebalancing
3. Suggestions for new investments
4. Risk management advice

Keep the response concise and actionable.`;

      const response = await fetch(LLAMA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LLAMA_API_KEY}`
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 500,
          temperature: 0.7,
          // Add any other Llama-specific parameters here
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Llama API Error:', errorData);
        throw new Error(`Llama API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      // Adjust this based on Llama's response format
      return data.generated_text || data.response;

    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      // Fallback to static recommendations if API fails
      return `
Investment Portfolio Analysis:

1. Portfolio Diversity
   • ${portfolio.stocks.length < 5 
       ? "Your portfolio has limited diversification" 
       : "Your portfolio shows good diversification"}
   • Current sectors: ${[...new Set(portfolio.stocks.map(s => s.sector || 'Unknown'))].join(', ')}
   • Recommendation: ${portfolio.stocks.length < 5 
       ? "Add stocks from different sectors" 
       : "Maintain current diversity"}

2. Current Holdings
   • Total Investment: $${portfolio.stocks.reduce((sum, stock) => sum + stock.totalInvestment, 0).toFixed(2)}
   • Number of Stocks: ${portfolio.stocks.length}
   • Average Investment per Stock: $${(portfolio.stocks.reduce((sum, stock) => sum + stock.totalInvestment, 0) / portfolio.stocks.length).toFixed(2)}

3. Investment Recommendations
   • ${portfolio.stocks.length < 3 ? "⚠️ Priority: Increase portfolio diversity" : "✅ Good portfolio size"}
   • Consider these actions:
     - Monitor market trends for current holdings
     - Set stop-loss orders for risk management
     - ${portfolio.stocks.length < 3 ? "Add at least 2-3 more stocks" : "Maintain current diversity"}
     - Review sector allocation quarterly

4. Risk Management Strategy
   • Set clear stop-loss levels for each position
   • Maintain emergency funds (3-6 months expenses)
   • Schedule regular portfolio reviews
   • Monitor market conditions weekly

Risk Profile: ${riskProfile}
`;
    }
  }
};