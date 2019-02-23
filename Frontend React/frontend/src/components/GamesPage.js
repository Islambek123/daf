import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import GamesList from "./GamesList";
import { fetchGames, deleteGame  } from "../actions";
import { Link } from "react-router-dom";

class GamesPage extends Component {
    state = {  }

    componentDidMount() {
        this.props.fetchGames();
    }

    render() { 
        console.log("--props GamesPage---", this.props);
        return ( 
        <div>
            <h1>Page Games</h1>
            <Link to="/games/new" className="btn btn-success">Додати гру</Link>
            <GamesList games={this.props.games} deleteGame={this.props.deleteGame}/>
        </div> 
        );
    }
}

GamesPage.propTypes = {
    games: PropTypes.array.isRequired,
    fetchGames: PropTypes.func.isRequired,
    deleteGame: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    
    return {
        games: state.games
    }; 
}
 
export default connect(mapStateToProps, {fetchGames, deleteGame})(GamesPage);