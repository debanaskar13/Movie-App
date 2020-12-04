import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserRating from './UserRating';

class Card extends Component {
    state = {}
    render() {
        return (
            <div className="mb-2" style={{ maxWidth: 150 }}>
                <Link to={"/details/" + this.props.id} style={{ textDecoration: 'none' }}>
                    <img className='flex_item' src={"http://image.tmdb.org/t/p/w500/" + this.props.path} alt="..." style={{ width: 130, height: 195 }} />
                    <p className='text-center' style={{ whiteSpace: 'normal', fontSize: '0.8rem', fontWeight: '500', color: 'black', position: 'relative' }}>
                        <bdi>{this.props.name}</bdi>
                        <div className='home_user_rating'>
                            <UserRating vote={this.props.vote} width={35} />
                        </div>
                    </p>
                </Link>
            </div>
        );
    }
}

export default Card;