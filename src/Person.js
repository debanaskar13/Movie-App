import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from './Card';

class Person extends Component {

    state = {
        person: [],
        asACast: [],
        bestMovies: [],
    }

    apiCall(personId) {
        axios.get('https://api.themoviedb.org/3/person/' + personId + '?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US')
            .then((res) => {
                this.setState({ person: res.data, asACast: this.state.asACast, bestMovies: this.state.bestMovies })
                window.scroll(0, 0);
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get('https://api.themoviedb.org/3/person/' + personId + '/movie_credits?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US')
            .then((response) => {
                let newData1 = [];
                for (let i = 0; i < response.data.cast.length; i++) {
                    if (response.data.cast[i].release_date !== "") {
                        if (response.data.cast[i].release_date !== undefined) {
                            newData1.push(response.data.cast[i]);
                        }
                    }
                }
                newData1.sort((a, b) => {
                    return new Date(new Date(a.release_date)) - new Date(new Date(b.release_date))
                })
                let newData2 = response.data.cast;
                newData2.sort((a, b) => {
                    if (a.popularity > b.popularity) return 1;
                    if (a.popularity < b.popularity) return -1;
                    return 0
                })
                this.setState({ person: this.state.person, asACast: newData1.reverse(), bestMovies: newData2 });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    gender(genderId) {
        if (genderId === 2) {
            return "Male"
        } else {
            return "Female"
        }
    }

    differentName() {
        if (this.state.person.also_known_as) {

            return this.state.person.also_known_as.map((name, index) => {
                return <p key={index}>{name}</p>
            })
        }

    }

    bestMovies() {
        return this.state.bestMovies.map((movie, index) => {
            if (index < 10) {
                return (
                    <Card name={movie.title} path={movie.poster_path} id={movie.id} vote={movie.vote_average} />
                )
            }
        })

    }

    returnYear(date) {
        let year = new Date(date).getFullYear()
        return year
    }

    calculateAge(date) {
        let today = new Date().getFullYear();
        let birthYear = new Date(date).getFullYear();
        if (date !== undefined) {

            return (today - birthYear)
        }
    }

    componentDidMount() {
        let personId = this.props.match.params.id
        this.apiCall(personId);

    }

    render() {

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="mt-3 mb-5 col-4">

                            <img className='card-image' src={"http://image.tmdb.org/t/p/w500/" + this.state.person.profile_path} alt="" style={{ width: 300, height: 450, borderRadius: 10 }} />

                            <div>
                                <h4 className="mt-4">
                                    Personal Info
                                    </h4>
                                <div className="mt-3"><b>Known For</b></div>
                                <p>{this.state.person.known_for_department}</p>
                                <div className="mt-4"><b>Known Credits</b></div>
                                <p>132</p>
                                <div className="mt-4"><b>Gender</b></div>
                                <p>{this.gender(this.state.person.gender)}</p>
                                <div className="mt-4"><b>BirthDay</b></div>
                                <p>{this.state.person.birthday}{" ( " + this.calculateAge(this.state.person.birthday) + " years old ) "}</p>
                                <div className="mt-4"><b>Place of Birth</b></div>
                                <p>{this.state.person.place_of_birth}</p>
                                <div className="mt-4"><b>Also Known As</b></div>

                                {
                                    this.differentName()
                                }

                            </div>
                        </div>
                        <div className="mt-5 col-8">
                            <h2><b>{this.state.person.name}</b></h2>
                            <h4 className="mt-5">Biography</h4>
                            <p>
                                {this.state.person.biography}
                            </p>
                            <h4 className="mt-5">Known For</h4>
                            <div className="testimonial-group">
                                <div className="flex_container">
                                    {
                                        this.bestMovies()
                                    }
                                </div>
                            </div>
                            <h4 className="mt-5">
                                Acting
                            </h4>
                            <table className="card credits" border='0' cellSpacing='0' cellPadding='0' >
                                <tbody>
                                    {
                                        this.state.asACast.map((movie, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <table className='credit_group'>
                                                            <tbody>
                                                                <tr>
                                                                    <td className='year'>{this.returnYear(movie.release_date)}</td>
                                                                    <td>
                                                                        <Link to={"/details/" + movie.id} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }}>
                                                                            <bdi>
                                                                                {movie.title}
                                                                            </bdi>
                                                                        </Link>
                                                                        <span>
                                                                            &nbsp;
                                                                            as
                                                                            &nbsp;
                                                                            <span className="character">
                                                                                {movie.character}
                                                                            </span>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );


    }
}

export default Person;