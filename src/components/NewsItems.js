import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
            <img src={!imageUrl?"https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F1021%2Fr1241670_1296x729_16%2D9.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a rel='noreferrer' href={newsUrl}  target='_blank' className="btn btn-primary btn-sm">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItems