import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import '../../styles/custom.css'

class ProductCard extends Component {
    state = {}
    render() {
        console.log('--product in props--', this.props);
        const { product } = this.props;
        return (
            <div className="item col-xs-12 col-lg-4 col-md-6 col-sm-12">
                <div className="thumbnail list">
                    <div className="custom">
                        <img className="group list-group-image" src={product.image} alt="" />
                    </div>
                    <div className="caption">

                        <h4 className="group inner list-group-item-heading">
                            <strong>{product.name}</strong>
                        </h4>

                        <i>
                            <p className="group inner list-group-item-text">
                                {product.description}
                            </p>
                        </i>
                        <p className="group inner list-group-item-text">
                            {product.manufactor}
                        </p>
                    </div>
                        
                    <div className="text-right but">
                    <Link to={`/product/${product.id}`} className="btn btn-success fixed-bottom">Edit</Link>
                        <div className="btn btn-danger fixed-bottom" onClick=
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