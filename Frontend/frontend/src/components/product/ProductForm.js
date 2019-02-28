import React from 'react';
import classnames from 'classnames';


class ProductForm extends React.Component {
    state = {
        id: this.props.product ? this.props.product.id : null,
        name: this.props.product ? this.props.product.name : '',
        image: this.props.product ? this.props.product.image : '',
        description: this.props.product ? this.props.product.description : '',
        available: this.props.product ? this.props.product.available : '',
        manufactor: this.props.product ? this.props.product.manufactor : '',
        errors: {
            //name: 'Обовязкове поле'
        },
        loading: false
    }
    setStateByErrors = (name, value) => {
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
            id: nextProps.product.id,
            name: nextProps.product.name,
            image: nextProps.product.image,
            description: nextProps.product.description,
            available: nextProps.product.available,
            manufactor: nextProps.product.manufactor
        });
    }

    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }

    uploadImageBase64 = (evt) => {
        const { name } = evt.target;
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
    onSubmitForm = (e) => {
        e.preventDefault();

        //validation
        let errors = {};
        if (this.state.name === '') errors.name = "Cant't be empty!"
        if (this.state.image === '') errors.image = "Cant't be empty!"
        if (this.state.description === '') errors.description = "Cant't be empty!"
        if (this.state.available === '') errors.available = "Cant't be empty!"
        if (this.state.manufactor === '') errors.manufactor = "Cant't be empty!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { id, name, image, description, available, manufactor } = this.state;
            this.props.saveProduct({ id, name, image, description, available, manufactor })
                .catch((err) => {
                    this.setState({ errors: err.response.data });
                });
        }
        else {
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

                <div className={classnames('form-group', { 'has-error': !!errors.name })}>
                    <label htmlFor="name">Назва</label>
                    <input type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="Назва" />
                    {!!errors.name ? <span className="help-block">{errors.name}</span> : ''}
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
                <div className={classnames('form-group', { 'has-error': !!errors.available })} >
                    <label htmlFor="available">Доступно</label>
                    <textarea type="text"
                        className="form-control"
                        id="available"
                        name="available"
                        value={this.state.available}
                        onChange={this.handleChange}
                        placeholder="Доступно" />
                    {!!errors.available ? <span className="help-block">{errors.available}</span> : ''}
                </div>
                <div className={classnames('form-group', { 'has-error': !!errors.manufactor })} >
                    <label htmlFor="manufactor">Manufactor</label>
                    <textarea type="text"
                        className="form-control"
                        id="manufactor"
                        name="manufactor"
                        value={this.state.manufactor}
                        onChange={this.handleChange}
                        placeholder="Manufactor" />
                    {!!errors.manufactor ? <span className="help-block">{errors.manufactor}</span> : ''}
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
                {form}
            </div>
        );
    }
}

export default ProductForm;