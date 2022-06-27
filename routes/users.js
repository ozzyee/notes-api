import express from "express";
import {
  getAllUses,
  getUser,
  addUser,
  updateUser,
  patchUser,
  deleteUser,
} from "../models/users.js";

const userRoute = express.Router();
userRoute.use(express.json());

// get users
userRoute.get("/", async function (req, res) {
  const users = await getAllUses();
  res.json(users);
});

// get user
userRoute.get("/:id", async function (req, res) {
  const id = req.params.id;
  const user = await getUser(id);
  return res.json(user);
});

// create user
userRoute.post("/", async function (req, res) {
  let data = req.body;
  const addUserData = await addUser(data);
  res.json(...addUserData);
});

// update user
userRoute.put("/:id", async function (req, res) {
  const id = req.params.id;
  const newData = req.body;
  const updatedUser = await updateUser(id, newData);
  res.json(...updatedUser);
});

// patch user
userRoute.patch("/:id", async function (req, res) {
  const id = req.params.id;
  const newData = req.body;
  const patchedUser = await patchUser(newData, id);
  res.json(patchedUser);
});

// delete use
userRoute.delete("/:id", async function (req, res) {
  const id = req.params.id;
  const deleteUserResponse = deleteUser(id);
  res.json(deleteUserResponse);
});

export default userRoute;
