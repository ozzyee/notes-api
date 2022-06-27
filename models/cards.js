import query from "../db/index.js";
import { crypt } from "../functions/crypt-data.js";
import { decrypt } from "../functions/decrypt-data.js";

// get cards
export async function getAllCards(authId) {
  const _authId = crypt(process.env.SALT, authId);
  const getCards = await query("SELECT * FROM cards WHERE authid=$1", [
    _authId,
  ]);

  const data = getCards.rows;

  return data.map((card) => {
    const authid = decrypt(process.env.SALT, card.authid);
    const cardnumber = decrypt(process.env.SALT, card.cardnumber);
    const cardsortcode = decrypt(process.env.SALT, card.cardsortcode);
    const cardaccountnumber = decrypt(process.env.SALT, card.cardaccountnumber);
    const cardcvv = decrypt(process.env.SALT, card.cardcvv);
    const cardpin = decrypt(process.env.SALT, card.cardpin);
    const cardinfo = decrypt(process.env.SALT, card.cardinfo);

    return {
      ...card,
      authid,
      cardnumber,
      cardsortcode,
      cardaccountnumber,
      cardcvv,
      cardpin,
      cardinfo,
    };
  });
}

// get card
export async function getCard(authId, id) {
  const _authId = crypt(process.env.SALT, authId);
  const getCard = await query("SELECT * FROM cards WHERE id=$1 AND authid=$2", [
    id,
    _authId,
  ]);

  return getCard.rows;
}

// create cards
export async function addCard(data) {
  const {
    authId,
    cardName,
    cardNumber,
    cardSortCode,
    cardAccountNumber,
    cardValidFrom,
    cardExpiryEnd,
    cardCvv,
    cardPin,
    cardInfo,
  } = data;

  // crypt data
  const _authId = crypt(process.env.SALT, authId);
  const _cardNumber = crypt(process.env.SALT, cardNumber);
  const _cardSortCode = crypt(process.env.SALT, cardSortCode);
  const _cardAccountNumber = crypt(process.env.SALT, cardAccountNumber);
  const _cardCvv = crypt(process.env.SALT, cardCvv);
  const _cardPin = crypt(process.env.SALT, cardPin);
  const _cardInfo = crypt(process.env.SALT, cardInfo);

  const newCard = await query(
    `INSERT INTO cards (
    authId,
    cardName,
    cardNumber,
    cardSortCode,
    cardAccountNumber,
    cardValidFrom,
    cardExpiryEnd,
    cardCvv,
    cardPin,
    cardinfo
    ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) 
    RETURNING     
    authId,
    cardName,
    cardNumber,
    cardSortCode,
    cardAccountNumber,
    cardValidFrom,
    cardExpiryEnd,
    cardCvv,
    cardPin,
    cardinfo
`,
    [
      _authId,
      cardName,
      _cardNumber,
      _cardSortCode,
      _cardAccountNumber,
      cardValidFrom,
      cardExpiryEnd,
      _cardCvv,
      _cardPin,
      _cardInfo,
    ]
  );
  return newCard.rows;
}

// update cards
export async function updateCard(id, authid, data) {
  const {
    authId,
    cardName,
    cardNumber,
    cardSortCode,
    cardAccountNumber,
    cardValidFrom,
    cardExpiryEnd,
    cardCvv,
    cardPin,
    cardInfo,
  } = data;

  // crypt data
  const _authId = crypt(process.env.SALT, authId);
  const _cardNumber = crypt(process.env.SALT, cardNumber);
  const _cardSortCode = crypt(process.env.SALT, cardSortCode);
  const _cardAccountNumber = crypt(process.env.SALT, cardAccountNumber);
  const _cardCvv = crypt(process.env.SALT, cardCvv);
  const _cardPin = crypt(process.env.SALT, cardPin);
  const _cardInfo = crypt(process.env.SALT, cardInfo);

  const updateCard = await query(
    `UPDATE cards SET cardname = $1, cardnumber = $4, cardsortcode = $5, cardaccountnumber = $6, cardvalidfrom = $7, cardexpiryend=$8, cardcvv=$9, cardpin=$10, cardInfo=$11 WHERE id=$2 AND authid=$3   RETURNING     
    authId,
    cardName,
    cardNumber,
    cardSortCode,
    cardAccountNumber,
    cardValidFrom,
    cardExpiryEnd,
    cardCvv,
    cardPin,
    cardinfo`,
    [
      cardName,
      id,
      _authId,
      _cardNumber,
      _cardSortCode,
      _cardAccountNumber,
      cardValidFrom,
      cardExpiryEnd,
      _cardCvv,
      _cardPin,
      _cardInfo,
    ]
  );

  return updateCard.rows;
}

// patch cards
export async function patchCard(authId, id, data) {
  const {
    cardName,
    cardNumber,
    cardSortCode,
    cardAccountNumber,
    cardValidFrom,
    cardExpiryEnd,
    cardCvv,
    cardPin,
    cardInfo,
  } = data;
  console.log(cardSortCode);

  const _authId = crypt(process.env.SALT, authId);

  console.log(_authId);

  if (cardName) {
    await query(
      `UPDATE cards SET cardName=$1 WHERE id=$2 AND authid=$3 RETURNING
        authId,
        cardName,
        cardNumber,
        cardSortCode,
        cardAccountNumber,
        cardValidFrom,
        cardExpiryEnd,
        cardCvv,
        cardPin,
        cardinfo`,
      [_cardNumber, id, _authId]
    );
  }

  if (cardNumber) {
    const _cardNumber = crypt(process.env.SALT, cardNumber);
    await query(
      `UPDATE cards SET cardnumber=$1 WHERE id=$2 AND authid=$3 RETURNING
        authId,
        cardName,
        cardNumber,
        cardSortCode,
        cardAccountNumber,
        cardValidFrom,
        cardExpiryEnd,
        cardCvv,
        cardPin,
        cardinfo`,
      [_cardNumber, id, _authId]
    );
  }

  if (cardSortCode) {
    const _cardSortCode = crypt(process.env.SALT, cardSortCode);
    await query(
      `UPDATE cards SET cardsortcode=$1 WHERE id=$2 AND authid=$3 RETURNING
        authId,
        cardName,
        cardNumber,
        cardSortCode,
        cardAccountNumber,
        cardValidFrom,
        cardExpiryEnd,
        cardCvv,
        cardPin,
        cardinfo`,
      [_cardSortCode, id, _authId]
    );
  }

  if (cardAccountNumber) {
    const _cardAccountNumber = crypt(process.env.SALT, cardAccountNumber);
    await query(
      `UPDATE cards SET cardaccountnumber=$1 WHERE id=$2 AND authid=$3 RETURNING
        authId,
        cardName,
        cardNumber,
        cardSortCode,
        cardAccountNumber,
        cardValidFrom,
        cardExpiryEnd,
        cardCvv,
        cardPin,
        cardinfo`,
      [_cardAccountNumber, id, _authId]
    );
  }

  if (cardValidFrom) {
    await query(
      `UPDATE cards SET cardvalidfrom=$1 WHERE id=$2 AND authid=$3 RETURNING
        authId,
        cardName,
        cardNumber,
        cardSortCode,
        cardAccountNumber,
        cardValidFrom,
        cardExpiryEnd,
        cardCvv,
        cardPin,
        cardinfo`,
      [cardValidFrom, id, _authId]
    );
  }

  if (cardExpiryEnd) {
    await query(
      `UPDATE cards SET cardexpiryend=$1 WHERE id=$2 AND authid=$3 RETURNING
        authId,
        cardName,
        cardNumber,
        cardSortCode,
        cardAccountNumber,
        cardValidFrom,
        cardExpiryEnd,
        cardCvv,
        cardPin,
        cardinfo`,
      [cardExpiryEnd, id, _authId]
    );
  }

  if (cardCvv) {
    const _cardCvv = crypt(process.env.SALT, cardCvv);
    await query(
      `UPDATE cards SET cardcvv=$1 WHERE id=$2 AND authid=$3 RETURNING
        authId,
        cardName,
        cardNumber,
        cardSortCode,
        cardAccountNumber,
        cardValidFrom,
        cardExpiryEnd,
        cardCvv,
        cardPin,
        cardinfo`,
      [_cardCvv, id, _authId]
    );
  }

  if (cardPin) {
    const _cardPin = crypt(process.env.SALT, cardPin);
    await query(
      `UPDATE cards SET cardpin=$1 WHERE id=$2 AND authid=$3 RETURNING
        authId,
        cardName,
        cardNumber,
        cardSortCode,
        cardAccountNumber,
        cardValidFrom,
        cardExpiryEnd,
        cardCvv,
        cardPin,
        cardinfo`,
      [_cardPin, id, _authId]
    );
  }

  if (cardInfo) {
    const _cardInfo = crypt(process.env.SALT, cardInfo);
    await query(
      `UPDATE cards SET cardinfo=$1 WHERE id=$2 AND authid=$3 RETURNING
        authId,
        cardName,
        cardNumber,
        cardSortCode,
        cardAccountNumber,
        cardValidFrom,
        cardExpiryEnd,
        cardCvv,
        cardPin,
        cardinfo`,
      [_cardInfo, id, _authId]
    );
  }

  const getCard = await query("SELECT * FROM cards WHERE id=$1 AND authid=$2", [
    id,
    _authId,
  ]);

  return getCard.rows;
}

// delete cards
export async function deleteCard(id, authId) {
  const _authId = crypt(process.env.SALT, authId);

  const selectedUser = await query(
    `DELETE FROM cards WHERE id = $1 AND authid=$2`,
    [id, _authId]
  );
  return selectedUser.rows;
}
