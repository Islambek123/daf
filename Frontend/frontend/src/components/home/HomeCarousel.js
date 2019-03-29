import React from 'react';
import logo from '../../assets/1.jpg';
import '../../styles/homepage.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../../styles/customImage.css';

class HomeCarousel extends React.Component{

    render(){
        const { products } = this.props;
        return(
            <Carousel
                        autoPlay
                        width="90%"
                        useKeyboardArrows
                        showStatus={false}
                        infiniteLoop={true}
                        >
                        
                       { products.map(item=> 
                       <div>
                           <div></div>
                            <img src={item.image}/>
                            <p className="legend">{item.name}</p>
                        </div>)}
                        

                    </Carousel>
        );
    }

}

export default HomeCarousel;