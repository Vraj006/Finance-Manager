const ALPHA_VANTAGE_API_KEY = 'IWI7R8YBA56AD3IV';
const BASE_URL = 'https://www.alphavantage.co/query';

export const stockService = {
  // Get stock search results
  // searchStocks: async (query) => {
  //   try {
  //       const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  //       console.log('Fetching from:', url); // Debug log
        
  //       const response = await fetch(url);
  //       const data = await response.json();
        
  //       console.log('API Response:', data); // Debug log
        
  //       if (data.Note) {
  //         // Alpha Vantage API limit message
  //         console.warn('API Limit Message:', data.Note);
  //         return [];
  //       }
        
  //       return data.bestMatches || [];
  //   } catch (error) {
  //     console.error('Error searching stocks:', error);
  //     throw error;
  //   }
  // },

  

  // Get stock details and price
  // getStockQuote: async (symbol) => {
  //   try {
  //       const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  //       console.log('Fetching quote from:', url); // Debug log
        
  //       const response = await fetch(url);
  //       const data = await response.json();
        
  //       console.log('Quote Response:', data); // Debug log
        
  //       if (data.Note) {
  //         console.warn('API Limit Message:', data.Note);
  //         return null;
  //       }
        
  //       return data['Global Quote'] || null;
  //   } catch (error) {
  //     console.error('Error fetching stock quote:', error);
  //     throw error;
  //   }
  // },
 

  searchStocks: async (query) => {
    try {
        const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(query)}&apikey=${ALPHA_VANTAGE_API_KEY}`;
        console.log('Searching stocks at:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Search response:', data);
        
        if (data.Note) {
            // API limit reached
            console.warn('API Limit Message:', data.Note);
            throw new Error(data.Note);
        }
        
        return data.bestMatches || [];
    } catch (error) {
        console.error('Error searching stocks:', error);
        throw error;
    }
},

getStockQuote: async (symbol) => {
    try {
        const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${ALPHA_VANTAGE_API_KEY}`;
        console.log('Fetching quote from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.Note) {
            console.warn('API Limit Message:', data.Note);
            throw new Error(data.Note);
        }
        
        return data['Global Quote'] || null;
    } catch (error) {
        console.error('Error fetching stock quote:', error);
        throw error;
    }
},

  // Get historical data for a stock
  getHistoricalData: async (symbol) => {
    try {
      const response = await fetch(
        `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.json();
      return data['Time Series (Daily)'] || null;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  }
}; 