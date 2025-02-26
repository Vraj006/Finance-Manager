// const express = require('express');
// const router = express.Router();
// const Portfolio = require('../models/Portfolio');
// const auth = require('../middleware/auth');

// // Get user's portfolio
// router.get('/', auth, async (req, res) => {
//   try {
//     const portfolio = await Portfolio.findOne({ userId: req.user.id });
//     if (!portfolio) {
//       return res.status(404).json({ message: 'Portfolio not found' });
//     }
//     res.json(portfolio);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Buy stocks
// router.post('/buy', auth, async (req, res) => {
//   try {
//     const { symbol, shares, price, companyName } = req.body;
    
//     let portfolio = await Portfolio.findOne({ userId: req.user.id });
    
//     if (!portfolio) {
//       portfolio = new Portfolio({ userId: req.user.id, stocks: [] });
//     }

//     const stockIndex = portfolio.stocks.findIndex(s => s.symbol === symbol);
//     const transaction = {
//       type: 'BUY',
//       shares,
//       price,
//       date: new Date()
//     };

//     if (stockIndex === -1) {
//       // New stock
//       portfolio.stocks.push({
//         symbol,
//         companyName,
//         shares,
//         averageBuyPrice: price,
//         totalInvestment: shares * price,
//         transactions: [transaction]
//       });
//     } else {
//       // Existing stock
//       const stock = portfolio.stocks[stockIndex];
//       const newTotalShares = stock.shares + shares;
//       const newTotalInvestment = stock.totalInvestment + (shares * price);
      
//       stock.shares = newTotalShares;
//       stock.averageBuyPrice = newTotalInvestment / newTotalShares;
//       stock.totalInvestment = newTotalInvestment;
//       stock.transactions.push(transaction);
//     }

//     await portfolio.save();
//     res.json(portfolio);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Sell stocks
// router.post('/sell', auth, async (req, res) => {
//   try {
//     const { symbol, shares, price } = req.body;
    
//     const portfolio = await Portfolio.findOne({ userId: req.user.id });
//     if (!portfolio) {
//       return res.status(404).json({ message: 'Portfolio not found' });
//     }

//     const stockIndex = portfolio.stocks.findIndex(s => s.symbol === symbol);
//     if (stockIndex === -1) {
//       return res.status(400).json({ message: 'Stock not found in portfolio' });
//     }

//     const stock = portfolio.stocks[stockIndex];
//     if (stock.shares < shares) {
//       return res.status(400).json({ message: 'Not enough shares to sell' });
//     }

//     stock.shares -= shares;
//     stock.totalInvestment = stock.shares * stock.averageBuyPrice;
    
//     stock.transactions.push({
//       type: 'SELL',
//       shares,
//       price,
//       date: new Date()
//     });

//     if (stock.shares === 0) {
//       portfolio.stocks.splice(stockIndex, 1);
//     }

//     await portfolio.save();
//     res.json(portfolio);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router; 









const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');

// Get user's portfolio
// router.get('/', auth, async (req, res) => {
//   try {
//     let portfolio = await Portfolio.findOne({ userId: req.user.id });
    
//     if (!portfolio) {
//       portfolio = new Portfolio({ 
//         userId: req.user.id,
//         stocks: [],
//         totalValue: 0,
//         totalInvestment: 0,
//         totalReturns: 0
//       });
//       await portfolio.save();
//     } else {
//       // Update current prices and values
//       const symbols = portfolio.stocks.map(stock => stock.symbol);
//       if (symbols.length > 0) {
//         // Implement your stock price fetching logic here
//         const currentPrices = {}; // Example: { 'AAPL': 150.50, 'GOOGL': 2800.00 }
//         await portfolio.updateStockValues(currentPrices);
//       }
//     }
    
//     res.json(portfolio);
//   } catch (error) {
//     console.error('Error fetching portfolio:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.get('/', auth, async (req, res) => {
  try {
      let portfolio = await Portfolio.findOne({ userId: req.user.id });
      
      if (!portfolio) {
          // If no portfolio exists, create a new one
          portfolio = new Portfolio({
              userId: req.user.id,
              stocks: [],
              totalValue: 0,
              totalInvestment: 0,
              totalReturns: 0
          });
          await portfolio.save();
      }

      // Send the portfolio data
      res.json({
          success: true,
          portfolio: {
              stocks: portfolio.stocks,
              totalValue: portfolio.totalValue || 0,
              totalInvestment: portfolio.totalInvestment || 0,
              totalReturns: portfolio.totalReturns || 0
            }
          });
          
    // console.log('Fetched portfolio:', portfolio);
  } catch (error) {
      console.error('Portfolio fetch error:', error);
      res.status(500).json({ 
          success: false, 
          message: 'Error fetching portfolio',
          error: error.message 
      });
  }
});
// In get endpoint

// Buy stocks
// router.post('/buy', auth, async (req, res) => {
//   try {
//     const { symbol, shares, price, companyName } = req.body;
    
//     let portfolio = await Portfolio.findOne({ userId: req.user.id });
    
//     if (!portfolio) {
//       portfolio = new Portfolio({ 
//         userId: req.user.id,
//         stocks: [],
//         totalValue: 0,
//         totalInvestment: 0,
//         totalReturns: 0
//       });
//     }

//     try {
//       await portfolio.addTransaction(symbol, 'BUY', shares, price);
      
//       // Update the company name if provided
//       const stockIndex = portfolio.stocks.findIndex(s => s.symbol === symbol);
//       if (stockIndex !== -1 && companyName) {
//         portfolio.stocks[stockIndex].companyName = companyName;
//         await portfolio.save();
//       }

//       res.json(portfolio);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   } catch (error) {
//     console.error('Error buying stock:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.post('/buy', auth, async (req, res) => {
  try {
      const { symbol, shares, price, companyName } = req.body;

      // Validate the request payload
      if (!symbol || !shares || !price || !companyName) {
          return res.status(400).json({ message: 'Missing required fields' });
      }

      if (isNaN(shares) || isNaN(price) || shares <= 0 || price <= 0) {
          return res.status(400).json({ message: 'Invalid shares or price value' });
      }

      let portfolio = await Portfolio.findOne({ userId: req.user.id });

      if (!portfolio) {
          // Initialize a new portfolio if it doesn't exist
          portfolio = new Portfolio({
              userId: req.user.id,
              stocks: [],
              totalValue: 0,
              totalInvestment: 0,
              totalReturns: 0
          });
      }

      // Add the transaction
      await portfolio.addTransaction(symbol, 'BUY', shares, price);

      // Update the company name if provided
      const stockIndex = portfolio.stocks.findIndex(s => s.symbol === symbol);
      if (stockIndex !== -1 && companyName) {
          portfolio.stocks[stockIndex].companyName = companyName;
      }

      await portfolio.save();
      res.json(portfolio);
  } catch (error) {
      console.error('Error buying stock:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Sell stocks
router.post('/sell', auth, async (req, res) => {
  try {
    const { symbol, shares, price } = req.body;
    
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    try {
      await portfolio.addTransaction(symbol, 'SELL', shares, price);
      
      // Remove stock from portfolio if shares are 0
      const stockIndex = portfolio.stocks.findIndex(s => s.symbol === symbol);
      if (stockIndex !== -1 && portfolio.stocks[stockIndex].shares === 0) {
        portfolio.stocks.splice(stockIndex, 1);
        await portfolio.save();
      }

      res.json(portfolio);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    console.error('Error selling stock:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update portfolio values
// router.post('/update-values', auth, async (req, res) => {
//   console.log('Update values route called');
//   try {
//     const portfolio = await Portfolio.findOne({ userId: req.user.id });
//     if (!portfolio) {
//       return res.status(404).json({ message: 'Portfolio not found' });
//     }

//     const symbols = portfolio.stocks.map(stock => stock.symbol);
//     if (symbols.length > 0) {
//       // Implement your stock price fetching logic here
//       const currentPrices = {}; // Example: { 'AAPL': 150.50, 'GOOGL': 2800.00 }
//       await portfolio.updateStockValues(currentPrices);
//     }

//     res.json(portfolio);
//   } catch (error) {
//     console.error('Error updating portfolio values:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

const fetchStockPrices = async (symbols) => {
  const stockPrices = {};
  const apiKey = 'IWI7R8YBA56AD3IV'; // Replace with your API key

  for (const symbol of symbols) {
      try {
          const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
          const data = await response.json();

          if (data['Global Quote'] && data['Global Quote']['05. price']) {
              stockPrices[symbol] = parseFloat(data['Global Quote']['05. price']); // Extract the price
          } else {
              console.warn(`Invalid response for ${symbol}:`, data);
              stockPrices[symbol] = null; // Set to null if price fetch fails
          }
      } catch (error) {
          console.error(`Error fetching price for ${symbol}:`, error);
          stockPrices[symbol] = null; // Set to null if price fetch fails
      }
  }

  return stockPrices;
};

router.post('/update-values', auth, async (req, res) => {
  console.log('Update values route called');
  try {
      const portfolio = await Portfolio.findOne({ userId: req.user.id });
      if (!portfolio) {
          console.log('Portfolio not found');
          return res.status(404).json({ message: 'Portfolio not found' });
      }

      const symbols = portfolio.stocks.map(stock => stock.symbol);
      console.log('Symbols to update:', symbols);

      if (symbols.length > 0) {
          const currentPrices = await fetchStockPrices(symbols); // Fetch current prices
          console.log('Current prices:', currentPrices);

          await portfolio.updateStockValues(currentPrices);
          console.log('Stock values updated successfully');
      }

      res.json(portfolio);
  } catch (error) {
      console.error('Error updating portfolio values:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;