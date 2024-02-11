const express = require("express");

const app = express();
app.use(express.json());
const movieControllers = require("./controllers/movieControllers");
const userHandlers = require("./controllers/userHandlers");

const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");
const { hashedPassword, verifyPassword} = require("./middlewares/auth");
const {verifyToken } = require ("./middlewares/verifyToken");

app.post("/api/movies", validateMovie, movieControllers.postMovie);
//app.post("/api/users", validateUser, userHandlers.postUser);

app.put("/api/movies", validateMovie, movieControllers.updateMovie);
app.put("/api/users", validateUser, userHandlers.updateUser);

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", hashedPassword, userHandlers.getUserByEmailWithPasswordAndPassToNext);

app.post("/api/movies", verifyToken, movieControllers.postMovie);
app.post("/api/users", verifyToken, hashedPassword, userHandlers.postUser);
app.post("/api/login", verifyToken,userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

app.put("/api/movies/:id", verifyToken, verifyToken, movieControllers.updateMovie);
app.put("/api/users/:id", verifyToken, hashedPassword, userHandlers.updateUser);

app.delete("/api/movies/:id", verifyToken, verifyToken, movieControllers.deleteMovie);
app.delete("/api/users/:id", verifyToken, hashedPassword, userHandlers.deleteUser);

module.exports = app;
