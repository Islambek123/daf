import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveGame, fetchGame, updateGame } from '../actions';
import { Redirect } from 'react-router';
import GameForm from './GameForm';

class GameFormPage extends Component {
    state = {
        redirect:false
      };

    componentDidMount=() => {
        if(this.props.match.params.id) {
            this.props.fetchGame(this.props.match.params.id);
        }
    }

    saveGame = ({id, title, image, description}) => {
        if(id) {
            return this.props.updateGame({id,title,image,description})
               .then(
                    () => { this.setState({redirect: true}); }
                );
        }
        else {
            return this.props.saveGame({title, image, description})
            .then(
                () => { this.setState({redirect: true}); }  
            );
        }
    }

    render() { 
        return ( 
            <div>
                {
                    this.state.redirect ?
                    <Redirect to="/games" /> :
                    <GameForm
                        game={this.props.game}
                        saveGame={this.saveGame}
                    />
                }
            </div>
         );
    }
}

const mapStateToProps = (state, props) => {
    if(props.match.params.id) {
        //console.log('--game forn Edit Redux--', state.games);
        const { id }=props.match.params;
        const { games } = state;
       // console.log("----router param----",id);
        //console.log(state.games.find(item=>(item.id===id)));
        return {
            game: games.find(item=>(item.id==id))
        }
    } 
    return { game: null};
} 
 
export default connect(mapStateToProps, {saveGame, fetchGame, updateGame})(GameFormPage);
