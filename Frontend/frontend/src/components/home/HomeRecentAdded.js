import React from 'react';

class HomeProduct extends React.Component {
    render() {
        const { products } = this.props;
        return (
            <div className="text-center">
                <h1>Recent Added</h1>
                <div className="text-left">
                    {products.map(item =>
                        <blockquote>
                            <strong><mark>{item.name}</mark></strong>
                            <mark>{item.descriptions}</mark>
                        </blockquote>)}
                </div>
            </div>
        );
    }

}

export default HomeProduct;
