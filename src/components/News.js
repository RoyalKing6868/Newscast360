import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';

export class News extends Component {
    constructor(){
    super();
    this.state = {
      articles : [],
      loading : false,
      page:1
    }
  }
  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d0dcb3a15c7e4b5a92a01b2656c66d2d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let rawData=await fetch(url);
    let data = await rawData.json();
      this.setState({
      articles : data.articles,
      totalResults: data.totalResults,
      loading:false
    })
  }
  handleClickNext = async ()=>{
    if(this.state.page+1 <= Math.ceil(this.state.totalResults/this.props.pageSize)){
      
      let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d0dcb3a15c7e4b5a92a01b2656c66d2d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let rawData=await fetch(url);
      let data = await rawData.json();
      
      this.setState({
        page : this.state.page + 1,
        articles : data.articles,
        loading : false
      })
    }
  }
  handleClickPrevious = async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d0dcb3a15c7e4b5a92a01b2656c66d2d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let rawData=await fetch(url);
    let data = await rawData.json();
    this.setState({
      page : this.state.page - 1,
      articles : data.articles,
      loading : false
    })
  }

  render() {
    return (
        <>
        
          <div className="container my-3 ">
            <h2 className='text-center'>Top Headlines</h2>
            {this.state.loading && <Spinner/>}
            <div className="row">
              {!this.state.loading && this.state.articles.map((element) =>{
                return <div  className="col-md-4" key={element.url}>
                  <NewsItems title={element.title?element.title:""}  imageUrl ={element.urlToImage} newsUrl={element.url}/>
                </div>
              })}
            </div>
            <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handleClickPrevious}>← Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button"  className="btn btn-primary" onClick={this.handleClickNext}>Next →</button>
            </div>
          </div>
        </>
    )
  }
}

export default News