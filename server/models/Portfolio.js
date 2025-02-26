// // const mongoose = require('mongoose');

// // const PortfolioSchema = new mongoose.Schema({
// //   userId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     required: true
// //   },
// //   stocks: [{
// //     symbol: {
// //       type: String,
// //       required: true
// //     },
// //     companyName: String,
// //     shares: {
// //       type: Number,
// //       required: true
// //     },
// //     averageBuyPrice: {
// //       type: Number,
// //       required: true
// //     },
// //     totalInvestment: {
// //       type: Number,
// //       required: true
// //     },
// //     transactions: [{
// //       type: {
// //         type: String,
// //         enum: ['BUY', 'SELL'],
// //         required: true
// //       },
// //       shares: Number,
// //       price: Number,
// //       date: {
// //         type: Date,
// //         default: Date.now
// //       }
// //     }]
// //   }],
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   },
// //   updatedAt: {
// //     type: Date,
// //     default: Date.now
// //   }
// // });

// // module.exports = mongoose.model('Portfolio', PortfolioSchema);




// const mongoose = require('mongoose');

// const PortfolioSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   stocks: [{
//     symbol: {
//       type: String,
//       required: true
//     },
//     companyName: String,
//     shares: {
//       type: Number,
//       required: true
//     },
//     averageBuyPrice: {
//       type: Number,
//       required: true
//     },
//     currentPrice: {
//       type: Number,
//       required: true
//     },
//     totalInvestment: {
//       type: Number,
//       required: true
//     },
//     currentValue: {
//       type: Number,
//       required: true
//     },
//     returns: {
//       type: Number,
//       required: true
//     },
//     transactions: [{
//       type: {
//         type: String,
//         enum: ['BUY', 'SELL'],
//         required: true
//       },
//       shares: Number,
//       price: Number,
//       date: {
//         type: Date,
//         default: Date.now
//       },
//       total: Number // Total value of transaction
//     }]
//   }],
//   totalValue: {
//     type: Number,
//     default: 0
//   },
//   totalInvestment: {
//     type: Number,
//     default: 0
//   },
//   totalReturns: {
//     type: Number,
//     default: 0
//   },
//   lastUpdated: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true
// });

// // Pre-save middleware to calculate totals
// // PortfolioSchema.pre('save', function(next) {
// //   // Calculate totals from stocks
// //   this.totalInvestment = this.stocks.reduce((sum, stock) => sum + stock.totalInvestment, 0);
// //   this.totalValue = this.stocks.reduce((sum, stock) => sum + stock.currentValue, 0);
// //   this.totalReturns = this.totalValue - this.totalInvestment;
// //   this.lastUpdated = new Date();
// //   next();
// // });

// PortfolioSchema.pre('save', function(next) {
//   // Calculate totals from stocks
//   this.totalInvestment = this.stocks.reduce((sum, stock) => sum + stock.totalInvestment, 0);
//   this.totalValue = this.stocks.reduce((sum, stock) => sum + stock.currentValue, 0);
//   this.totalReturns = this.totalValue - this.totalInvestment;
//   this.lastUpdated = new Date();
//   next();
// });

// // Method to update stock prices and values
// // PortfolioSchema.methods.updateStockValues = async function(stockPrices) {
// //   this.stocks = this.stocks.map(stock => {
// //     const currentPrice = stockPrices[stock.symbol];
// //     if (currentPrice) {
// //       stock.currentPrice = currentPrice;
// //       stock.currentValue = stock.shares * currentPrice;
// //       stock.returns = stock.currentValue - stock.totalInvestment;
// //     }
// //     return stock;
// //   });

// //   // Recalculate portfolio totals
// //   this.totalInvestment = this.stocks.reduce((sum, stock) => sum + stock.totalInvestment, 0);
// //   this.totalValue = this.stocks.reduce((sum, stock) => sum + stock.currentValue, 0);
// //   this.totalReturns = this.totalValue - this.totalInvestment;
// //   this.lastUpdated = new Date();

// //   return this.save();
// // };

// PortfolioSchema.methods.updateStockValues = async function(stockPrices) {
//   this.stocks = this.stocks.map(stock => {
//       const currentPrice = stockPrices[stock.symbol];
//       if (currentPrice) {
//           stock.currentPrice = currentPrice;
//           stock.currentValue = stock.shares * currentPrice;
//           stock.returns = stock.currentValue - stock.totalInvestment;
//       }
//       return stock;
//   });

//   // Recalculate portfolio totals
//   this.totalInvestment = this.stocks.reduce((sum, stock) => sum + stock.totalInvestment, 0);
//   this.totalValue = this.stocks.reduce((sum, stock) => sum + stock.currentValue, 0);
//   this.totalReturns = this.totalValue - this.totalInvestment;
//   this.lastUpdated = new Date();

//   return this.save();
// };

// // Method to add a stock transaction
// // PortfolioSchema.methods.addTransaction = function(symbol, type, shares, price) {
// //   const stock = this.stocks.find(s => s.symbol === symbol);
  
// //   if (!stock) {
// //     if (type === 'BUY') {
// //       this.stocks.push({
// //         symbol,
// //         shares,
// //         averageBuyPrice: price,
// //         currentPrice: price,
// //         totalInvestment: shares * price,
// //         currentValue: shares * price,
// //         returns: 0,
// //         transactions: [{
// //           type,
// //           shares,
// //           price,
// //           total: shares * price
// //         }]
// //       });
// //     } else {
// //       throw new Error('Cannot sell stock that is not in portfolio');
// //     }
// //   } else {
// //     if (type === 'BUY') {
// //       const newTotalShares = stock.shares + shares;
// //       const newTotalInvestment = stock.totalInvestment + (shares * price);
// //       stock.averageBuyPrice = newTotalInvestment / newTotalShares;
// //       stock.shares = newTotalShares;
// //       stock.totalInvestment = newTotalInvestment;
// //     } else if (type === 'SELL') {
// //       if (stock.shares < shares) {
// //         throw new Error('Not enough shares to sell');
// //       }
// //       stock.shares -= shares;
// //       stock.totalInvestment = stock.shares * stock.averageBuyPrice;
// //     }

// //     stock.currentValue = stock.shares * stock.currentPrice;
// //     stock.returns = stock.currentValue - stock.totalInvestment;
    
// //     stock.transactions.push({
// //       type,
// //       shares,
// //       price,
// //       total: shares * price
// //     });
// //   }

// //   return this.save();
// // };


// PortfolioSchema.methods.addTransaction = function(symbol, type, shares, price) {
//   const stock = this.stocks.find(s => s.symbol === symbol);
  
//   if (!stock) {
//       if (type === 'BUY') {
//           this.stocks.push({
//               symbol,
//               shares,
//               averageBuyPrice: price,
//               currentPrice: price,
//               totalInvestment: shares * price,
//               currentValue: shares * price,
//               returns: 0,
//               transactions: [{
//                   type,
//                   shares,
//                   price,
//                   total: shares * price
//               }]
//           });
//       } else {
//           throw new Error('Cannot sell stock that is not in portfolio');
//       }
//   } else {
//       if (type === 'BUY') {
//           const newTotalShares = stock.shares + shares;
//           const newTotalInvestment = stock.totalInvestment + (shares * price);
//           stock.averageBuyPrice = newTotalInvestment / newTotalShares;
//           stock.shares = newTotalShares;
//           stock.totalInvestment = newTotalInvestment;
//       } else if (type === 'SELL') {
//           if (stock.shares < shares) {
//               throw new Error('Not enough shares to sell');
//           }
//           stock.shares -= shares;
//           stock.totalInvestment = stock.shares * stock.averageBuyPrice;
//       }

//       stock.currentValue = stock.shares * stock.currentPrice;
//       stock.returns = stock.currentValue - stock.totalInvestment;
      
//       stock.transactions.push({
//           type,
//           shares,
//           price,
//           total: shares * price
//       });
//   }

//   return this.save();
// };

// module.exports = mongoose.model('Portfolio', PortfolioSchema);
























const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stocks: [{
    symbol: {
      type: String,
      required: true
    },
    companyName: String,
    shares: {
      type: Number,
      required: true
    },
    averageBuyPrice: {
      type: Number,
      required: true
    },
    currentPrice: {
      type: Number,
      required: true
    },
    totalInvestment: {
      type: Number,
      required: true
    },
    currentValue: {
      type: Number,
      required: true
    },
    returns: {
      type: Number,
      required: true
    },
    transactions: [{
      type: {
        type: String,
        enum: ['BUY', 'SELL'],
        required: true
      },
      shares: Number,
      price: Number,
      date: {
        type: Date,
        default: Date.now
      },
      total: Number
    }]
  }],
  totalValue: {
    type: Number,
    default: 0
  },
  totalInvestment: {
    type: Number,
    default: 0
  },
  totalReturns: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate totals
PortfolioSchema.pre('save', function(next) {
  this.totalInvestment = this.stocks.reduce((sum, stock) => sum + (stock.totalInvestment || 0), 0);
  this.totalValue = this.stocks.reduce((sum, stock) => sum + (stock.currentValue || 0), 0);
  this.totalReturns = this.totalValue - this.totalInvestment;
  this.lastUpdated = new Date();
  next();
});

// Fix for the addTransaction method in the Portfolio model
PortfolioSchema.methods.addTransaction = function(symbol, type, shares, price) {
  console.log('Method called: addTransaction');
  if (isNaN(shares) || isNaN(price) || shares <= 0 || price <= 0) {
      throw new Error('Invalid shares or price value');
  }

  let stock = this.stocks.find(s => s.symbol === symbol);

  if (!stock) {
      if (type === 'BUY') {
          const newStock = {
              symbol,
              shares,
              averageBuyPrice: price,
              currentPrice: price,
              totalInvestment: shares * price,
              currentValue: shares * price,
              returns: 0,
              transactions: [{
                  type,
                  shares,
                  price,
                  total: shares * price
              }]
          };
          
          this.stocks.push(newStock);
          
          console.log('Added new stock:', {
              symbol,
              type,
              shares,
              price,
              totalInvestment: newStock.totalInvestment,
              currentValue: newStock.currentValue,
              returns: newStock.returns
          });
      } else {
          throw new Error('Cannot sell stock that is not in portfolio');
      }
  } else {
      if (type === 'BUY') {
          const newTotalShares = stock.shares + shares;
          const newTotalInvestment = stock.totalInvestment + (shares * price);
          stock.averageBuyPrice = newTotalInvestment / newTotalShares;
          stock.shares = newTotalShares;
          stock.totalInvestment = newTotalInvestment;
      } else if (type === 'SELL') {
          if (stock.shares < shares) {
              throw new Error('Not enough shares to sell');
          }
          stock.shares -= shares;
          stock.totalInvestment = stock.shares * stock.averageBuyPrice;
      }

      stock.currentValue = stock.shares * stock.currentPrice;
      stock.returns = stock.currentValue - stock.totalInvestment;

      stock.transactions.push({
          type,
          shares,
          price,
          total: shares * price
      });
      
      console.log('Updated stock after transaction:', {
          symbol,
          type,
          shares,
          price,
          totalInvestment: stock.totalInvestment,
          currentValue: stock.currentValue,
          returns: stock.returns
      });
  }

  return this.save();
};
// Method to update stock prices and values
// PortfolioSchema.methods.updateStockValues = async function(stockPrices) {
//   console.log('Method called: updateStockValues');
//   this.stocks = this.stocks.map(stock => {
//     const currentPrice = stockPrices[stock.symbol];
//     if (currentPrice && !isNaN(currentPrice)) {
//       stock.currentPrice = currentPrice;
//       stock.currentValue = stock.shares * currentPrice;
//       stock.returns = stock.currentValue - stock.totalInvestment;

//       console.log('Updated stock values:', {
//         symbol: stock.symbol,
//         currentPrice: stock.currentPrice,
//         currentValue: stock.currentValue,
//         totalInvestment: stock.totalInvestment,
//         returns: stock.returns
//     });
//     } else {
//       console.warn(`Invalid price for ${stock.symbol}: ${currentPrice}`);
//     }
    
//     return stock;
//   });

//   this.totalInvestment = this.stocks.reduce((sum, stock) => sum + (stock.totalInvestment || 0), 0);
//   this.totalValue = this.stocks.reduce((sum, stock) => sum + (stock.currentValue || 0), 0);
//   this.totalReturns = this.totalValue - this.totalInvestment;
//   this.lastUpdated = new Date();

//   return this.save();
// };
PortfolioSchema.methods.updateStockValues = async function(stockPrices) {
  console.log('Method called: updateStockValues',stockPrices); // Add this log
  try {
      this.stocks = this.stocks.map(stock => {
          const currentPrice = stockPrices[stock.symbol];
          if (currentPrice && !isNaN(currentPrice)) {
              stock.currentPrice = currentPrice;
              stock.currentValue = stock.shares * currentPrice;
              stock.returns = stock.currentValue - stock.totalInvestment;

              console.log('Updated stock:', { // Add this log
                  symbol: stock.symbol,
                  shares: stock.shares,
                  currentPrice: stock.currentPrice,
                  currentValue: stock.currentValue,
                  totalInvestment: stock.totalInvestment,
                  returns: stock.returns
              });
          } else {
              console.warn(`Invalid price for ${stock.symbol}: ${currentPrice}`);
          }
          return stock;
      });

      // Recalculate portfolio totals
      this.totalInvestment = this.stocks.reduce((sum, stock) => sum + (stock.totalInvestment || 0), 0);
      this.totalValue = this.stocks.reduce((sum, stock) => sum + (stock.currentValue || 0), 0);
      this.totalReturns = this.totalValue - this.totalInvestment;
      this.lastUpdated = new Date();

      console.log('Updated portfolio totals:', { // Add this log
          totalInvestment: this.totalInvestment,
          totalValue: this.totalValue,
          totalReturns: this.totalReturns
      });

      return this.save();
  } catch (error) {
      console.error('Error in updateStockValues:', error);
      throw error;
  }
};

// Method to add a stock transaction
// PortfolioSchema.methods.addTransaction = function(symbol, type, shares, price) {
//   if (isNaN(shares) || isNaN(price) || shares <= 0 || price <= 0) {
//     throw new Error('Invalid shares or price value');
//   }

//   const stock = this.stocks.find(s => s.symbol === symbol);
  
//   if (!stock) {
//     if (type === 'BUY') {
//       this.stocks.push({
//         symbol,
//         shares,
//         averageBuyPrice: price,
//         currentPrice: price,
//         totalInvestment: shares * price,
//         currentValue: shares * price,
//         returns: 0,
//         transactions: [{
//           type,
//           shares,
//           price,
//           total: shares * price
//         }]
//       });
//     } else {
//       throw new Error('Cannot sell stock that is not in portfolio');
//     }
//   } else {
//     if (type === 'BUY') {
//       const newTotalShares = stock.shares + shares;
//       const newTotalInvestment = stock.totalInvestment + (shares * price);
//       stock.averageBuyPrice = newTotalInvestment / newTotalShares;
//       stock.shares = newTotalShares;
//       stock.totalInvestment = newTotalInvestment;
//     } else if (type === 'SELL') {
//       if (stock.shares < shares) {
//         throw new Error('Not enough shares to sell');
//       }
//       stock.shares -= shares;
//       stock.totalInvestment = stock.shares * stock.averageBuyPrice;
//     }

//     stock.currentValue = stock.shares * stock.currentPrice;
//     stock.returns = stock.currentValue - stock.totalInvestment;
    
//     stock.transactions.push({
//       type,
//       shares,
//       price,
//       total: shares * price
//     });
//   }

//   return this.save();
// };



module.exports = mongoose.model('Portfolio', PortfolioSchema);