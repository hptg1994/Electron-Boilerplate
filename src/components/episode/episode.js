// npm packages
import React from 'react';
import { withRouter, Link } from "react-router-dom"

export default withRouter(({ episode, history }) => {

  const openEpisodePage = () => {
    const location = {
      pathname: `/episode${episode._id}`,
      state: episode,
    };

    history.push(location);
  }
  return (
    <div className="column">
      <div className="card" onClick={openEpisodePage} >
        <div className="card-image">
          <figure className="image is-3by3">
            <img src={episode.image} alt={episode.title} />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{episode.title}</p>
              <p className="subtitle is-6">{episode.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});