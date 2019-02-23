import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameCard from './GameCard';

class GamesList extends Component {
    state = {  }
    
    render() { 
        console.log('--GamesList props--', this.props);
        const { games } = this.props;
        const emptyMessage = (
            <p>Список пустий</p>
        );
        const gamesList = (
            <div className="row">
                {games.map(item => <GameCard game={item} key={item.id} deleteGame={this.props.deleteGame} />)}
            </div>
        );
        return ( 
            <div>
                {games.length===0 ? emptyMessage : gamesList}
            </div>
         );
    }
}

GamesList.propTypes = {
    games: PropTypes.array.isRequired,
    deleteGame: PropTypes.func.isRequired
};
 
export default GamesList;