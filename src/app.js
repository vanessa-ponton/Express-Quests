const express = require("express");

const app = express();
app.use(express.json());
const movieControllers = require("./controllers/movieControllers");

const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");

app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.post("/api/users", validateUser, movieControllers.postUser);

app.put("/api/movies", validateMovie, movieControllers.updateMovie);
app.put("/api/users", validateUser, movieControllers.updateUser);



app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", movieControllers.getUsers);
app.get("/api/users/:id", movieControllers.getUsersById);

app.post("/api/movies", movieControllers.postMovie);
app.post("/api/users", movieControllers.postUser);

app.put("/api/movies/:id", movieControllers.updateMovie);
app.put("/api/users/:id", movieControllers.updateUser);

app.delete("/api/movies/:id", movieControllers.deleteMovie);
app.delete("/api/users/:id", movieControllers.deleteUser);

module.exports = app;
