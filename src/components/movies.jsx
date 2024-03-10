import React, { Component } from "react";

import Pagination from "./common/pagination";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import Filters from "./common/filters";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { user } from "../services/authService";
import _ from "lodash";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();

    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      debugger;
      await deleteMovie(movie._id);
      toast.success("This movie is successfully deleted.");
    } catch (ex) {
      if (ex.response && ex.response === 404) {
        toast.error("This movie has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      sortColumn,
      selectedGenre,
      searchQuery,
      genres,
    } = this.state;
    const user = this.props;
    // if (count === 0) {
    //   return (
    //     <p className="pt-5 mx-auto">There is no movies in our database.</p>
    //   );
    // }
    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-4">
            <Filters
              items={genres}
              selectedGenre={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-lg-8">
            {this.props.user && (
              <Link className="btn btn-primary mb-3" to={`/movies/new`}>
                Add New Movies
              </Link>
            )}

            <p className="mx-auto">
              Showing {totalCount} movies in the database
            </p>
            <SearchBox
              value={searchQuery}
              onChange={this.handleSearch}
            ></SearchBox>
            <MoviesTable
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              movies={movies}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            ></MoviesTable>

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
