import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ProductsList from "./ProductsList";
import { fetchProducts, deleteProduct } from "../../actions/productActions";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

class ProductsPage extends Component {
    state = {
        redirect: false,
        loading: true
    }

    componentDidMount() {
        this.props.fetchProducts()
            .then(
                () => { this.setState({ loading: false }) },
                (err) => {
                    if (typeof (err.response) == 'undefined')
                        console.log("err.response", err);
                    else if (err.response.status == 401) {
                        this.setState({ redirect: true });
                    }
                }
            );
    }

    render() {
        console.log("--props ProductsPage---", this.props);
        const { loading } = this.state;
        const page = (
            loading ? <span>Loading ...</span> :
                <div>
                    <h1>Products</h1>
                    <ProductsList products={this.props.products} deleteProduct={this.props.deleteProduct} />
                    <Link to="/products/new" className="btn btn-success">Add Product</Link>
                </div>
        );
        return (
            this.state.redirect ?
                <Redirect to="/login" /> :
                page
        );
    }
}

ProductsPage.propTypes = {
    products: PropTypes.array.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    return {
        products: state.products
    };
}

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(ProductsPage);