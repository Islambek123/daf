import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveProduct, fetchProduct, updateProduct } from '../../actions/productActions';
import { Redirect } from 'react-router';
import ProductForm from './ProductForm';

class ProductFormPage extends Component {
    state = {
        redirect: false
    };

    componentDidMount = () => {
        if (this.props.match.params.id) {
            this.props.fetchProduct(this.props.match.params.id);
        }
    }

    saveProduct = ({ id, name, image, description, available, manufactor }) => {
        if (id) {
            return this.props.updateProduct({ id, name, image, description, available, manufactor })
                .then(
                    () => { this.setState({ redirect: true }); }
                );
        }
        else {
            return this.props.saveProduct({ name, image, description, available, manufactor })
                .then(
                    () => { this.setState({ redirect: true }); }
                );
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.redirect ?
                        <Redirect to="/products" /> :
                        <ProductForm
                            product={this.props.product}
                            saveProduct={this.saveProduct}
                        />
                }
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    if (props.match.params.id) {
        //console.log('--game forn Edit Redux--', state.games);
        const { id } = props.match.params;
        const { products } = state;
        // console.log("----router param----",id);
        //console.log(state.games.find(item=>(item.id===id)));
        return {
            product: products.find(item => (item.id == id))
        }
    }
    return { product: null };
}

export default connect(mapStateToProps, { saveProduct, fetchProduct, updateProduct })(ProductFormPage);
