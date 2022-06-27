import query from "../index.js";

async function createCardsTable() {
  const res = await query(`CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    authId TEXT,
    cardName TEXT,
    cardNumber TEXT,
    cardSortCode Text,
    cardAccountNumber Text,
    cardValidFrom TEXT,
    cardExpiryEnd TEXT,
    cardCvv TEXT,
    cardPin TEXT,
    cardInfo Text
)`);
  console.log("Created cards table: ", res);
}

createCardsTable();
