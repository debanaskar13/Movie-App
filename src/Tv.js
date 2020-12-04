import React, { Component } from 'react'
import Modal from 'react-modal'
import axios from 'axios';
import RecommendCard from './RecommendCard';
import UserRating from './UserRating';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from './loading';
import TopCast from './TopCast';
import { Link } from 'react-router-dom';

class Tv extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: {},
            recommend: [],
            trailer: '',
            modalIsOpen: false,
            loading: true,
            crew: [],
        }
    }

    renderGenre() {
        if (this.state.details.genres) {
            return this.state.details.genres.map((genre, index) => {
                let span;
                if (index === this.state.details.genres.length - 1) {
                    span = <span key={index} className="mr-1">{genre.name} </span>
                } else {
                    span = <span key={index} className="mr-1">{genre.name},</span>
                }
                return span
            })
        }
    }

    productionCountries() {
        if (this.state.details.production_countries) {
            return this.state.details.production_countries.map((country, index) => {
                let span;
                if (index === this.state.details.genres.length - 1) {
                    span = <span key={index} className="mr-1">{country.iso_3166_1} </span>
                } else {
                    span = <span key={index} className="mr-1">{country.iso_3166_1},</span>
                }
                return span
            })
        }
    }

    randomBackground() {
        let colorName = ['blue_background', 'bluesky_background', 'chocolate_background', 'brown_background', 'light_background'];
        let background = colorName[Math.floor(Math.random() * colorName.length)]
        return background
    }

    controlModal() {
        if (this.state.modalIsOpen) {
            this.setState({ details: this.state.details, recommend: this.state.recommend, trailer: this.state.trailer, modalIsOpen: false, crew: this.state.crew })
        } else {
            this.setState({ details: this.state.details, recommend: this.state.recommend, trailer: this.state.trailer, modalIsOpen: true, crew: this.state.crew })
        }

    }

    returnDirector() {
        let director;
        let temp = '';
        let id;
        this.state.crew.map((crew, index) => {
            if (crew.job === 'Director') {
                director = crew.name;
                id = crew.id;
            }
            if (crew.name === director) {
                temp += crew.job + ' , '
            }
        })
        return (
            <>
                <Link to={'/person/' + id} style={{ textDecoration: 'none', color: '#ffffff' }}>
                    <p className="mt-5" style={{ fontWeight: 'bold', fontSize: '1em', padding: 0, margin: 0 }}>{director}</p>
                </Link>
                <p style={{ fontSize: '0.9em', padding: 0, margin: 0 }}>{temp}</p>
            </>
        )


    }

    apiCall(movieId) {
        trackPromise(
            axios
                .get('https://api.themoviedb.org/3/tv/' + movieId + '?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US')
                .then((response) => {
                    this.setState({ details: response.data, recommend: this.state.recommend, trailer: this.state.trailer, modalIsOpen: this.state.modalIsOpen, loading: false, crew: this.state.crew })
                })
                .catch((error) => {
                    console.log(error)
                }),

            axios
                .get('https://api.themoviedb.org/3/tv/' + movieId + '/recommendations?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1')
                .then((response) => {
                    this.setState({ details: this.state.details, recommend: response.data.results, trailer: this.state.trailer, modalIsOpen: this.state.modalIsOpen, loading: false, crew: this.state.crew });
                    window.scroll(0, 0);
                })
                .catch((error) => {
                    console.log(error);
                }),

            axios.get('https://api.themoviedb.org/3/tv/' + movieId + '/videos?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US')
                .then((res) => {
                    let element = document.getElementById('play_trailer_btn');
                    if (res.data.results[0] === undefined) {
                        element.classList.add('hide_trailer_btn');
                    } else {
                        this.setState({ details: this.state.details, recommend: this.state.recommend, trailer: res.data.results[0].key, modalIsOpen: this.state.modalIsOpen, loading: false, crew: this.state.crew });
                        element.classList.remove('hide_trailer_btn');
                    }
                    window.scroll(0, 0);
                })
                .catch((err) => {
                    console.log(err);
                }),

            axios.get('https://api.themoviedb.org/3/tv/' + movieId + '/credits?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1')
                .then((response) => {
                    this.setState({ details: this.state.details, recommend: this.state.recommend, trailer: this.state.trailer, modalIsOpen: this.state.modalIsOpen, loading: false, crew: response.data.crew });
                })
                .catch((error) => {
                    console.log(error);
                })
        );
    }

    componentDidUpdate(prevProps) {
        let movieId = this.props.match.params.term;
        if (movieId !== prevProps.match.params.term) {
            this.apiCall(movieId);
            let element = document.getElementById('play_trailer_btn');
            if (this.state.trailer === undefined) {
                element.classList.add('hide_trailer_btn')
            } else {
                element.classList.remove('hide_trailer_btn')
            }
        } else {
            window.scroll(0, 0);
        }


    }

    componentDidMount() {
        let movieId = this.props.match.params.term;

        this.apiCall(movieId);


    }

    render() {
        let date = new Date(this.state.details.first_air_date);
        let releaseYear = date.getFullYear();
        let releaseMonth = date.getMonth() + 1;
        let releasedate = date.getDate();
        return (
            <>
                {this.state.loading ? <LoadingIndicator /> : null}
                <div style={{
                    backgroundImage: `url(http://image.tmdb.org/t/p/w500/${this.state.details.backdrop_path} )`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    marginTop: '30px',
                }}>

                    <div id={this.randomBackground()} className="jumbotron jumbotron-fluid" >

                        <div className="container text-white" >

                            <div className="row" >
                                <div className="col-4">
                                    <img className="card-img-top" style={{ borderRadius: '10px', width: '300px', height: '450px' }} src={"http://image.tmdb.org/t/p/w500/" + this.state.details.poster_path} alt="..." />
                                </div>
                                <div className="col-8 mt-3">
                                    <h2><b>{this.state.details.name}</b> <span style={{ color: " rgb(232, 243, 242)" }}>({releaseYear})</span></h2>
                                    <p>{releasedate}/{releaseMonth}/{releaseYear}({this.productionCountries()})&nbsp;<b style={{ fontSize: "30px" }}>.</b> &nbsp;
                                        {
                                            this.renderGenre()
                                        }
                                    </p>
                                    {/* <h3 > {this.state.details.vote_average} / 10</h3> */}
                                    <UserRating vote={this.state.details.vote_average} width={11} />
                                    <button id='play_trailer_btn' className="btn text-white btn-lg" onClick={() => { this.controlModal() }}>
                                        <span className='fas fa-play mr-2' style={{ fontSize: '20px' }}> </span>
                                        Play Trailer
                                    </button>
                                    <Modal isOpen={this.state.modalIsOpen} backdrop="static" keyboard="false" ariaHideApp={false}
                                        contentLabel="Selected Option"
                                    >
                                        <button className='float-right btn btn-danger btn-small' onClick={() => { this.controlModal() }}>&times;</button>
                                        <iframe title={this.state.trailer} width="1380" height="600" src={"https://www.youtube.com/embed/" + this.state.trailer + "?autoplay=1"} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    </Modal>

                                    <p className='font-italic' style={{ color: " rgb(232, 243, 242,0.78)" }}><b>{this.state.details.tagline}</b></p>
                                    <h4>Overview</h4>
                                    <p style={{ textAlign: 'justify', lineHeight: '110%' }}>{this.state.details.overview}</p>
                                    {
                                        this.returnDirector()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-5 mb-5 testimonial-group">
                    <div className="col-12">
                        <h3>Top Cast</h3>
                    </div>
                    <div className="flex_container">
                        <TopCast type='tv' id={this.props.match.params.term} />
                    </div>
                </div>
                <div className="container mb-5">
                    <div className="testimonial-group">
                        <div className="col-12">
                            <span style={{ fontSize: "1.5rem", marginRight: 9 }}>Similar to</span><Link to={"/tv/" + this.props.match.params.term} style={{ textDecoration: 'none' }}><h3 style={{ display: "inline" }}>{this.state.details.name}</h3></Link>
                        </div>
                        <div className='flex_container'>
                            {
                                this.state.recommend.map((movie, index) => {
                                    return <RecommendCard type='tv' name={movie.name} overview={movie.overview} path={movie.backdrop_path} id={movie.id} percent={movie.vote_average * 10} />
                                })
                            }
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Tv

