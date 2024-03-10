// import React, { Component } from "react";
import React from "react";
import Joi from "joi-browser";

import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MoviesFrom extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label("Number in stock"),
    dailyRentalRate: Joi.number().min(0).required().label("Rate"),
  };
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateMovies() {
    console.log("populateMovies");
    const movieId = this.props.match.params.id;
    console.log(movieId);
    if (movieId === "new") return;

    try {
      const { data: movie } = await getMovie(movieId);
      console.log(getMovie());
      console.log(movie);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.responses && ex.responses.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
    // if (!movie) return this.props.history.replace("/movies/new");
  }
  mapToViewModel(movie) {
    console.log(movie);
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    // const genre = [{ _id: "", name: "Select options" }, ...getGenres()];
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <h1 className="mb-4">Movies form</h1>
            <form action="" onSubmit={this.handleSubmit}>
              {this.renderInput("title", "Title", "text")}
              {/* {this.renderInput("genreid", "Genre", "text")} */}
              {this.renderSelect("genreId", "Genre", this.state.genres)}
              {this.renderInput("numberInStock", "Number in stock", "number")}
              {this.renderInput("dailyRentalRate", "Rate", "number")}
              {this.renderButton("Save")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesFrom;
