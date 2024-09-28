import Trade from "../database/dbSchema.js";

export const getBalance = async (req, res) => {

  const timestamp = new Date(req.body.timestamp);

  try {
    const trades = await Trade.find({ utcTime: { $lte: timestamp } });
    console.log("Trades",trades.length)
    const balances = {};
    

    trades.forEach((trade) => {
      if (!balances[trade.baseCoin]) {
        balances[trade.baseCoin] = 0;
      }

      if (trade.operation === "buy") {
        balances[trade.baseCoin] += trade.amount;
      } else if (trade.operation === "sell") {
        balances[trade.baseCoin] -= trade.amount;
      }
    });
    console.log("balance",balances)
    res.status(200).send(balances);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching asset balances", error: err });
  }
};
