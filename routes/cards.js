import express from "express";
import {
  addCard,
  deleteCard,
  getAllCards,
  getCard,
  patchCard,
  updateCard,
} from "../models/cards.js";

const cardsRoutes = express.Router();
cardsRoutes.use(express.json());

// get cards
cardsRoutes.get("/:authId", async function (req, res) {
  const authId = req.params.authId;
  const getAllCardsData = await getAllCards(authId);
  res.json(getAllCardsData);
});

// get card
cardsRoutes.get("/:authId/:id", async function (req, res) {
  const authId = req.params.authId;
  const id = req.params.id;
  const getCardData = await getCard(authId, id);
  res.json(getCardData);
});

// create cards
cardsRoutes.post("/", async function (req, res) {
  const data = req.body;
  const addCardData = await addCard(data);
  res.json(...addCardData);
});

// update cards
cardsRoutes.put("/:authId/:id", async function (req, res) {
  const authId = req.params.authId;
  const id = req.params.id;
  const data = req.body;
  const updateCardData = await updateCard(id, authId, data);
  res.json(updateCardData);
});

// patch cards
cardsRoutes.patch("/:authId/:id", async function (req, res) {
  const authId = req.params.authId;
  const id = req.params.id;
  const data = req.body;
  const patchCardData = await patchCard(authId, id, data);
  res.json(patchCardData);
});

// delete cards
cardsRoutes.delete("/:authId/:id", async function (req, res) {
  const authId = req.params.authId;
  const id = req.params.id;
  const deletedCardData = deleteCard(id, authId);
  res.json(deletedCardData);
});

export default cardsRoutes;
