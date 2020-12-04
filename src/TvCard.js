import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class TvCard extends Component {
    state = {

    }

    returnDate(date) {
        const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let newDate = new Date(date);
        let month = monthName[newDate.getMonth()];
        let year = newDate.getFullYear();
        let day = newDate.getDate()
        return (`${month} ${day} , ${year}`)
    }

    returnName() {
        if (this.props.type === 'tv') {
            return this.props.tvShow.name
        } else if (this.props.type === 'movie') {
            return this.props.tvShow.title
        }
    }

    returnReleaseDate() {
        if (this.props.type === 'tv') {
            return this.returnDate(this.props.tvShow.first_air_date)
        } else if (this.props.type === 'movie') {
            return this.returnDate(this.props.tvShow.release_date)
        }
    }

    returnSrc() {
        if (this.props.type === 'tv') {
            return `/tv/${this.props.tvShow.id}`
        } else if (this.props.type === 'movie') {
            return `/details/${this.props.tvShow.id}`
        }
    }

    render() {
        return (
            <>
                <div className="mt-3 card_tv">
                    <div className="wrapper">
                        <div className="image">
                            <div className="poster">
                                <Link to={this.returnSrc.bind(this)}>
                                    <img src={"http://image.tmdb.org/t/p/w500/" + this.props.tvShow.poster_path} alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="details">
                            <div className="wrapper">
                                <div className="title">
                                    <Link>
                                        <h2>{this.returnName()}</h2>
                                    </Link>
                                    <span className='release_date'>{this.returnReleaseDate()}</span>
                                </div>
                            </div>
                            <div className="overview">
                                <p>{this.props.tvShow.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default TvCard
