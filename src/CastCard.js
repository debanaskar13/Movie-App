import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class CastCard extends Component {
    state = {}
    render() {
        return (
            <>
                <div className="mb-2" style={{ maxWidth: 150 }}>
                    <Link to={"/person/" + this.props.id} style={{ textDecoration: 'none' }}>
                        <img className='flex_item' src={"http://image.tmdb.org/t/p/w500/" + this.props.path} alt="" style={{ width: 130, height: 195 }} />
                        <p className='text-center' style={{ whiteSpace: 'normal', fontSize: '0.8rem', fontWeight: '500', color: 'black' }}>
                            <bdi>{this.props.name}</bdi>
                        </p>
                    </Link>
                </div>
            </>
        );
    }
}

export default CastCard;