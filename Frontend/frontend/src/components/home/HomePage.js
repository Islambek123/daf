import React from 'react';
import { fetchSomeProducts } from "../../actions/productActions";
import HomeProduct from './HomeRecentAdded';
import HomeCarousel from './HomeCarousel';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    state = {
        loading: true,
        redirect: false
    }
    componentDidMount = () => {
        this.props.fetchSomeProducts()
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
        console.log(this.props.products);
        return (
            <div>
                <div className="col-md-6">
                    <HomeCarousel products={this.props.products} />
                </div>
                <div className="col-md-6">
                    <HomeProduct products={this.props.products} />
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
export default connect(mapStateToProps, { fetchSomeProducts })(HomePage);