import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./Common/Like";
import Pagination from "./Common/Pagination";

class Movie extends Component {
  state = {
    movies: getMovies(),
    currentPage:1,
    pageSize:4
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => {
      return m._id !== movie._id;
    });
    this.setState({ movies: movies });
  };

  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;

    this.setState({ movies });
  }

  handlePageChange=(page)=>
  {

       this.setState({currentPage:page})

  }
  render() {
    const { length: count } = this.state.movies;
    const {currentPage,pageSize}=this.state

    if (count === 0) return "there are no movies in database";

    return (
      <React.Fragment>
        <p>showing {count} movies in database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.like}
                    onClick={() => {
                      this.handleLike(movie);
                    }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      this.handleDelete(movie);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange}/>
      </React.Fragment>
    );
  }
}

export default Movie;
