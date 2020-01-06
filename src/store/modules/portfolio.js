const state = {
  funds: 10000,
  stocks: []
};

const mutations = {
  'BUY_STOCK'(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find(element => {
      //find if the stock match the existing stocks in the portfolio
      return element.id == stockId
    });
    if (record) {
      record.quantity += quantity;
    } else {
      //new stock
      state.stocks.push({
        id: stockId,
        quantity: quantity
      })
    }
    state.funds -= stockPrice * quantity;
  },
  'SELL_STOCK'(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find(element => {
      //find if the stock match the existing stocks in the portfolio
      return element.id == stockId
    });
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record));
    }
    state.funds += stockPrice * quantity;
  },
  'SET_PORTFOLIO'(state, portfolio) {
    state.funds = portfolio.funds;
    state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : []
  }
};

const actions = {
  sellStock({ commit }, order) {
    commit('SELL_STOCK', order);
  }
}

const getters = {
  stockPortfolio(state, getters) {
    return state.stocks.map(stock => {
      //go to all stocks to get the name and price because for the portfolio is storing only id and quantity
      const record = getters.stocks.find(element => element.id == stock.id)
      return {
        id: stock.id,
        quantity: stock.quantity,
        name: record.name,
        price: record.price
      }
    })
  },
  funds(state) {
    return state.funds;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}