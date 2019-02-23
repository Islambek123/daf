import React from 'react';
import classnames from 'classnames';


class GameForm extends React.Component {
    state = {
        id: this.props.game ? this.props.game.id : null,
        title: this.props.game ? this.props.game.title : '',
        image: this.props.game ? this.props.game.image : '',
        description: this.props.game ? this.props.game.description : '',
        errors: {
            //title: 'Обовязкове поле'
        },
        loading: false
    }
    setStateByErrors=(name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
              {
                [name]: value,
                errors
              }
            )
          }
          else {
            this.setState(
              { [name]: value })
          }
    } 

    //компонент получает новые props. 
    //Этод метод не вызывается в момент первого render'a
    componentWillReceiveProps = (nextProps) => {
        //console.log('--Change propts---',nextProps);
        this.setState({
            id: nextProps.game.id,
            title: nextProps.game.title,
            image: nextProps.game.image,
            description: nextProps.game.description
        });
    }

    handleChange=(e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }

    uploadImageBase64 = (evt) => {
        const {name} = evt.target;
        if (evt.target.files && evt.target.files[0]) {
            if (evt.target.files[0].type.match(/^image\//)) {
                console.log("---Upload file---", evt.target);
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.setStateByErrors(name, e.target.result);
                }
                reader.readAsDataURL(evt.target.files[0]);
            }
            else {
                alert("Invalid image type");
            }
        }
        else {
            alert("Upload file please");
        }        
    }
    onSubmitForm=(e) => {
        e.preventDefault();

        //validation
        let errors = {};
        if (this.state.title === '') errors.title = "Cant't be empty!"
        if (this.state.image === '') errors.image = "Cant't be empty!"
        if (this.state.description === '') errors.description = "Cant't be empty!"
        
        const isValid=Object.keys(errors).length===0
        if (isValid) {
            const {id, title, image, description} = this.state;
            this.props.saveGame({id, title, image, description})
                .catch((err) => { 
                    this.setState({ errors: err.response.data });
                });
        }
        else
        {
            this.setState({ errors });
        }
    }
    

    render() { 
        console.log("this.props", this.props);
        console.log("this.state", this.state);
        const { errors } = this.state;
        const form = (
            <form onSubmit={this.onSubmitForm}>
                <h1>Додати нову гру</h1>

                <div className={classnames('form-group', { 'has-error': !!errors.title })}>
                    <label htmlFor="title">Назва</label>
                    <input type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder="Назва" />
                    {!!errors.title ? <span className="help-block">{errors.title}</span> : ''}
                </div>

                
                <div className={classnames('form-group', { 'has-error': !!errors.description })} >
                    <label htmlFor="description">Опис</label>
                    <textarea type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        placeholder="Опис" />
                    {!!errors.description ? <span className="help-block">{errors.description}</span> : ''}
                </div>

                <div className={classnames('form-group', { 'has-error': !!errors.image })}>
                    <label htmlFor="image">Фото</label>
                    <input type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={this.uploadImageBase64}
                        placeholder="Фото" />
                    {!!errors.image ? <span className="help-block">{errors.image}</span> : ''}
                </div>

                    {
                        this.state.image !== '' &&
                        <div className="form-group">
                            <span className="thumbnail col-md-2">
                                <img src={this.state.image} alt="Image" />
                            </span>
                        </div>
                    }

                <div className="form-group">
                    <div className="col-md-4">
                        <button type="submit" className="btn btn-warning">Додати <span className="glyphicon glyphicon-send"></span></button>
                    </div>
                </div>
            </form>
        );
        return (
            <div>
              { form }
            </div>
          );
    }
}

export default GameForm;