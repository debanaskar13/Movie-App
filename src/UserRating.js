import React, { Component } from 'react'

class UserRating extends Component {
    render() {
        return (
            <>
                <div className="single-chart" style={{ width: `${this.props.width}%` }}>
                    <svg viewBox="0 0 36 36" className="circular-chart orange">
                        <path className="circle-bg"
                            d="M18 2.0845
                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                            strokeDasharray={`${this.props.vote * 10} 100`}
                            d="M18 2.0845
                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">{this.props.vote * 10}%</text>
                    </svg>
                </div>
            </>
        )
    }
}

export default UserRating
