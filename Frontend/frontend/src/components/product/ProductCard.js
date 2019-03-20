import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

class ProductCard extends Component {
    state = {}
    render() {
        console.log('--product in props--', this.props);
        const { product } = this.props;
        return (
            <div className="item col-xs-4 col-lg-4">
                <div className="thumbnail">
                    <img className="group list-group-image" src={product.image} alt="" />
                    <div className="caption">
                        <h4 className="group inner list-group-item-heading">
                            {product.name}
                        </h4>
                        <p className="group inner list-group-item-text">
                            {product.description}
                        </p>
                        <p className="group inner list-group-item-text">
                            {product.available}
                        </p>
                        
                        <p className="group inner list-group-item-text">
                            {product.manufactor}
                        </p>
                    </div>
                    <div>
                        <Link to={`/product/${product.id}`} className="btn btn-success">Edit</Link>
                        <div className="btn btn-danger" onClick=
                            {
                                () => this.props.deleteProduct(product.id)

                            }>Delete</div>
                    </div>
                </div>
            </div>
        );
    }
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired
}

export default ProductCard;