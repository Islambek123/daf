import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ProductsList from "./ProductsList";
import { fetchProducts, deleteProduct  } from "../../Octions";
import { Link } from "react-router-dom";

class ProductsPage extends Component {
    state = {  }

    componentDidMount() {
        this.props.fetchProducts();
    }

    render() { 
        console.log("--props ProductsPage---", this.props);
        return ( 
        <div>
            <h1>Page Products</h1>
            <Link to="/products/new" className="btn btn-success">Додати гру</Link>
            <ProductsList products={this.props.products} deleteProduct={this.props.deleteProduct}/>
        </div> 
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
 
export default connect(mapStateToProps, {fetchProducts, deleteProduct})(ProductsPage);