import React from 'react';
import { fetchProducts } from "../../actions/productActions";
import HomeProduct from './HomeRecentAdded';
import HomeCarousel from './HomeCarousel';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    state = {
        loading: true,
        redirect: false
    }
    componentDidMount = () => {
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
        console.log(this.props);
        return (
            <div>
                <div className="col-md-6">
                    <HomeCarousel />
                </div>
                <div className="col-md-6">
                    <HomeProduct />
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {

    return {
        products: state.products
    };
}
export default connect(mapStateToProps, { fetchProducts })(HomePage);