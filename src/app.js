const express = require("express");

const app = express();
app.use(express.json());
const movieControllers = require("./controllers/movieControllers");
const userHandlers = require("./controllers/userHandlers");

const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");
const { hashedPassword } = require("./middlewares/auth.js");

app.post("/api/movies", validateMovie, movieControllers.postMovie);
//app.post("/api/users", validateUser, userHandlers.postUser);

app.put("/api/movies", validateMovie, movieControllers.updateMovie);
app.put("/api/users", validateUser, userHandlers.updateUser);

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", hashedPassword, userHandlers.getUsersById);

app.post("/api/movies", movieControllers.postMovie);
app.post("/api/users", hashedPassword, userHandlers.postUser);

app.put("/api/movies/:id", movieControllers.updateMovie);
app.put("/api/users/:id", hashedPassword, userHandlers.updateUser);

app.delete("/api/movies/:id", movieControllers.deleteMovie);
app.delete("/api/users/:id", hashedPassword, userHandlers.deleteUser);

module.exports = app;
