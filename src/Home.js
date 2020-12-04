import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

class Home extends Component {
    state = {
        topRatedMovies: [],
        popularMovies: [],
        upcomingMovies: [],
    }

    searchMovie() {
        let searchTerm = document.querySelector('#search').value;
        this.props.history.push('/search/' + searchTerm)
    }

    componentDidMount() {
        trackPromise(
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1')
                .then((response) => {
                    // console.log(response.data.results);
                    this.setState({ topRatedMovies: response.data.results, popularMovies: this.state.popularMovies, upcomingMovies: this.state.upcomingMovies })
                })
                .catch((err) => {
                    console.log(err);
                }),

            axios.get('https://api.themoviedb.org/3/movie/popular?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US')
                .then((response) => {
                    // console.log(response.data.results);
                    this.setState({ topRatedMovies: this.state.topRatedMovies, popularMovies: response.data.results, upcomingMovies: this.state.upcomingMovies })
                    // console.log(this.state.popularMovies);
                })
                .catch((error) => {
                    console.log(error);
                }),

            axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US')
                .then((response) => {
                    this.setState({ topRatedMovies: this.state.topRatedMovies, popularMovies: this.state.popularMovies, upcomingMovies: response.data.results })
                    // console.log(this.state);

                })
                .catch((err) => {
                    console.log(err);
                })
        );
    }

    render() {
        return (
            <>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-3">Welcome to Movie App</h1>
                        <p className="lead">A onestop place where you can have every info about all of your favourite movies , TV shows , Actors Actress</p>
                        <input id='search' type="text" className="form-control form-control-lg" placeholder="search" />
                        <button onClick={this.searchMovie.bind(this)} className="mt-3 btn btn-dark btn-lg">Search</button>
                    </div>
                </div>
                <div className="container mb-5">
                    <div className="row testimonial-group">
                        <div className="col-12">
                            <h3>Top Movies</h3>
                        </div>
                        <div className="flex_container">
                            {
                                this.state.topRatedMovies.map((movie, index) => {
                                    return (
                                        <>
                                            <Card name={movie.title} path={movie.poster_path} id={movie.id} vote={movie.vote_average} />
                                        </>
                                    )


                                })
                            }
                        </div>
                    </div>
                    <div className=" mt-5 row testimonial-group">
                        <div className="col-12">
                            <h3>Popular Movies</h3>
                        </div>
                        <div className="flex_container">
                            {
                                this.state.popularMovies.map((movie, index) => {
                                    return <Card name={movie.title} overview={movie.overview} path={movie.poster_path} id={movie.id} vote={movie.vote_average} />
                                })
                            }
                        </div>
                    </div>
                    <div className=" mt-5 row testimonial-group">
                        <div className="col-12">
                            <h3>Upcoming Movies</h3>
                        </div>
                        <div className="flex_container">
                            {
                                this.state.upcomingMovies.map((movie, index) => {
                                    return (
                                        <>
                                            <Card name={movie.title} overview={movie.overview} path={movie.poster_path} id={movie.id} vote={movie.vote_average} />
                                        </>

                                    )
                                })
                            }
                        </div>
                    </div>

                </div>

            </>

        );
    }
}

export default Home;