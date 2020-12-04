import React, { Component } from 'react'
import CastCard from './CastCard';
import axios from 'axios';

class TopCast extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cast: [],
            crew: [],
        }
    }

    apiCall(movieId) {
        axios.get('https://api.themoviedb.org/3/' + this.props.type + '/' + movieId + '/credits?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1')
            .then((response) => {
                this.setState({ cast: response.data.cast, crew: response.data.crew });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidUpdate(prevProps) {
        let movieId = this.props.id;

        if (prevProps.id !== movieId) {
            this.apiCall(movieId);
        }
    }

    componentDidMount() {
        let movieId = this.props.id;

        this.apiCall(movieId);
    }

    render() {
        return (
            <>
                {
                    this.state.cast.map((cast, index) => {
                        if (index < 10) {
                            return <CastCard name={cast.name} path={cast.profile_path} id={cast.id} character={cast.character} />
                        }
                    })
                }
            </>
        );
    }
}

export default TopCast;