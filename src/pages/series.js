import React from "react"
import { Crunchyroll } from "../api";


class Series extends React.Component{

  constructor(){
    super();
    this.state = {
      episodes:[]
    }
  }

  componentDidMount(){
    const {location} = this.props;
    Crunchyroll.getEpisodes(location.state)
  }
  
  render(){
    const {match} = props;
    return (
      <div>
        <h1>Series Pages!:{match.params.id}</h1>
      </div>
    );
  }
}

export default Series;