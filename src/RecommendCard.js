import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class RecommendCard extends Component {
    state = {}
    render() {
        return (
            <div style={{ maxWidth: 270 }}>
                <Link to={"/" + this.props.type + "/" + this.props.id} style={{ textDecoration: 'none' }}>
                    <img className='flex_item' src={"http://image.tmdb.org/t/p/w500/" + this.props.path} alt="" style={{ width: 250, height: 141 }} />
                    <p className='float-left ml-2' style={{ whiteSpace: 'normal', fontSize: '0.8rem', fontWeight: '500', color: 'black' }}>
                        <bdi>{this.props.name}</bdi>
                    </p>
                    <p className='float-right mr-2' style={{ textDecoration: 'none', color: 'black' }}>
                        {this.props.percent} %
                    </p>
                </Link>
            </div>
        );
    }
}

export default RecommendCard;