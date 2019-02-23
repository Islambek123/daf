import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

class ProductsList extends Component {
    state = {  }
    
    render() { 
        console.log('--ProductsList props--', this.props);
        const { products } = this.props;
        const emptyMessage = (
            <p>Список пустий</p>
        );
        const productsList = (
            <div className="row">
                {products.map(item => <ProductCard product={item} key={item.id} deleteProduct={this.props.deleteProduct} />)}
            </div>
        );
        return ( 
            <div>
                {products.length===0 ? emptyMessage : productsList}
            </div>
         );
    }
}

ProductsList.propTypes = {
    products: PropTypes.array.isRequired,
    deleteProduct: PropTypes.func.isRequired
};
 
export default ProductsList;