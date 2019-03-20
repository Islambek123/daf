import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import addFlashMessage from '../flash/FlashMessage'

class ProductsList extends Component {
    state = {  }
    
    render() { 
        console.log('--ProductsList props--', this.props);
        const { products } = this.props;
        const emptyMessage = (
            <h4><strong>List is Empty</strong></h4>
        );
        const productsList = (
            <div className="row">
                {products.map(item => <ProductCard product={item} key={item.id} deleteProduct={this.props.deleteProduct} addFlashMessage={addFlashMessage}/>)}
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