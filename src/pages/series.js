import React from "react"
import { Crunchyroll } from "../api";


class Series extends React.Component{
  render(){
    const {match,location} = props;
    return (
      <div>
        <h1>Series Pages!:{match.params.id}</h1>
      </div>
    );
  }
}

export default Series;