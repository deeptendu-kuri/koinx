import Trade from "../database/dbSchema.js"
import csvParser from "csv-parser"
import fs from "fs";

export const uploadCSV = (req, res) => {
    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on("data", (data) => {
            const [baseCoin, quoteCoin] = data.Market.split("/");
            results.push({
                utcTime: new Date(data.UTC_Time),
                operation: data.Operation.toLowerCase(),
                market: data.Market,
                baseCoin: baseCoin,
                quoteCoin: quoteCoin,
                amount: parseFloat(data["Buy/Sell Amount"]),
                price: parseFloat(data.Price),
            });
        })
        .on("end", async () => {
            try {
                await Trade.insertMany(results);
                res.status(200).send({ message: "Trades uploaded successfully" });
            } catch (err) {
                res.status(500).send({ message: "Error saving trades", error: err });
            }
        });
};
