import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import TvCard from './TvCard';
import axios from 'axios';

class ResultFor extends Component {
    state = {
        tv: [],
        movies: [],
        people: [],
        keywords: [],
        companies: [],
        collections: [],
    }

    changeClass(event) {
        let selected = document.querySelector('.selected').classList;
        selected.remove('selected');
        event.target.parentNode.classList.add('selected');
        this.props.sendId(event.target.parentNode.id)
    }

    returnCard() {
        let id = this.props.id;
        if (id === 'tv') {

            return this.state.tv.map((tvShow, index) => {
                return <TvCard type='tv' tvShow={tvShow} />
            })
        } else if (id === 'movies') {

            return this.state.movies.map((tvShow, index) => {
                return <TvCard type='movie' tvShow={tvShow} />
            })
        } else if (id === 'people') {

            return this.state.people.map((tvShow, index) => {
                return <TvCard type='people' tvShow={tvShow} />
            })
        }
    }

    apiCall(searchTerm) {
        axios.get('https://api.themoviedb.org/3/search/tv?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1&include_adult=false&query=' + searchTerm)
            .then((response) => {
                this.setState({ tv: response.data.results, movies: this.state.movies, people: this.state.people, keywords: this.state.keywords, companies: this.state.companies, collections: this.state.collections })
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get('https://api.themoviedb.org/3/search/movie?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1&include_adult=false&query=' + searchTerm)
            .then((response) => {
                this.setState({ tv: this.state.tv, movies: response.data.results, people: this.state.people, keywords: this.state.keywords, companies: this.state.companies, collections: this.state.collections })
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get('https://api.themoviedb.org/3/search/person?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1&include_adult=false&query=' + searchTerm)
            .then((response) => {
                this.setState({ tv: this.state.tv, movies: this.state.movies, people: response.data.results, keywords: this.state.keywords, companies: this.state.companies, collections: this.state.collections })
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get('https://api.themoviedb.org/3/search/keyword?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1&include_adult=false&query=' + searchTerm)
            .then((response) => {
                this.setState({ tv: this.state.tv, movies: this.state.movies, people: this.state.people, keywords: response.data.results, companies: this.state.companies, collections: this.state.collections })
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get('https://api.themoviedb.org/3/search/collection?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1&include_adult=false&query=' + searchTerm)
            .then((response) => {
                this.setState({ tv: this.state.tv, movies: this.state.movies, people: this.state.people, keywords: this.state.keywords, companies: this.state.companies, collections: response.data.results })
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get('https://api.themoviedb.org/3/search/company?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1&include_adult=false&query=' + searchTerm)
            .then((response) => {
                this.setState({ tv: this.state.tv, movies: this.state.movies, people: this.state.people, keywords: this.state.keywords, companies: response.data.results, collections: this.state.collections })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        let searchTerm = this.props.term;
        this.apiCall(searchTerm)

    }

    render() {

        return (
            <>
                <div className="col-3">
                    <h3 className='pl-4 pt-4 pb-4 text-white mt-5' style={{
                        borderTopLeftRadius: '10px', borderTopRightRadius: '10px', fontWeight: "bold", fontSize: '1.1em', marginBottom: 0,
                        backgroundColor: 'rgb(1,180,228)'
                    }}>Search Results</h3>
                    <ul className='searchList'>
                        <li id='tv' className="selected">
                            <Link onClick={this.changeClass.bind(this)} to={'/search/' + this.props.term} style={{ textDecoration: 'none', color: '#000000', paddingLeft: '20px' }}>
                                TV Shows
                                </Link>
                        </li>
                        <li id='movies' className='p-2'>
                            <Link onClick={this.changeClass.bind(this)} to={'/search/' + this.props.term} style={{ textDecoration: 'none', color: '#000000', paddingLeft: '20px' }}>
                                Movies
                                </Link>
                        </li>
                        <li id='people' className='p-2'>
                            <Link onClick={this.changeClass.bind(this)} to={'/search/' + this.props.term} style={{ textDecoration: 'none', color: '#000000', paddingLeft: '20px' }}>
                                People
                                </Link>
                        </li>
                        <li id='keywords' className='p-2'>
                            <Link onClick={this.changeClass.bind(this)} to={'/search/' + this.props.term} style={{ textDecoration: 'none', color: '#000000', paddingLeft: '20px' }}>
                                Keywords
                                </Link>
                        </li>
                        <li id='companies' className='p-2'>
                            <Link onClick={this.changeClass.bind(this)} to={'/search/' + this.props.term} style={{ textDecoration: 'none', color: '#000000', paddingLeft: '20px' }}>
                                Companies
                                </Link>
                        </li>
                        <li id='collections' className='p-2'>
                            <Link onClick={this.changeClass.bind(this)} to={'/search/' + this.props.term} style={{ textDecoration: 'none', color: '#000000', paddingLeft: '20px' }}>
                                Collections
                                </Link>
                        </li>
                    </ul>
                </div>
                <div className="mt-5 mb-4 col-9">
                    {
                        this.returnCard()
                    }
                </div>
            </>
        )
    }
}

export default ResultFor
