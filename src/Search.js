import React, { Component } from 'react';
import axios from 'axios';
import ResultFor from './ResultFor';

class Search extends Component {

    state = {
        listId: '',
    }

    getId(id) {
        this.setState({ listId: id })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <ResultFor sendId={this.getId.bind(this)} term={this.props.match.params.term} id={this.state.listId} />

                </div>

            </div>
        )
    }
}

export default Search
