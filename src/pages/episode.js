import React from "react"
import { Crunchyroll } from "../api/crunchroll";
import { Link } from "react-router-dom";
import { Observable } from "rxjs";
import db from "../db";
import _ from "lodash";

class Episode extends React.Component {

  constructor(props) {
    super();
    this.state = {
      episode: null
    }
    const { location } = props;
    Crunchyroll.getEpisode(location.state);
  }

  render() {
    const { episode } = this.state;

    return (
      <div>

      </div> 
    );
  }
}

export default Episode;