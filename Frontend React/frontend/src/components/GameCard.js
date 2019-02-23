import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

class GameCard extends Component {
    state = {  }
    render() { 
        console.log('--game in props--', this.props);
        const { game } = this.props;
        return ( 
            <div className="item  col-xs-4 col-lg-4">
                <div className="thumbnail">
                    <img className="group list-group-image" src={game.image} alt="" />
                    <div className="caption">
                        <h4 className="group inner list-group-item-heading">
                            {game.title}
                        </h4>
                        <p className="group inner list-group-item-text">
                            {game.description}
                        </p>
                    </div>
                    <div>
                        <Link to={`/game/${game.id}`} className="btn btn-success">Edit</Link>
                        <div className="btn btn-danger" onClick={()=>this.props.deleteGame(game.id)}>Delete</div>
                    </div>
                </div>
            </div>
        );
    }
}

GameCard.propTypes = {
    game: PropTypes.object.isRequired,
    deleteGame: PropTypes.func.isRequired
}
 
export default GameCard;