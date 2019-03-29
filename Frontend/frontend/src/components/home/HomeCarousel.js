import React from 'react';
import logo from '../../assets/1.jpg';
import '../../styles/homepage.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class HomeCarousel extends React.Component{

    render(){
        return(
            <Carousel
                        autoPlay
                        width="90%"
                        useKeyboardArrows
                        showStatus={false}
                        infiniteLoop={true}>

                        <div>
                            <img src={logo} />
                            <p className="legend">Legend 1</p>
                        </div>

                        <div>
                            <img src={logo} />
                            <p className="legend">Legend 2</p>
                        </div>

                        <div>
                            <img src={logo} />
                            <p className="legend">Legend 3</p>
                        </div>

                    </Carousel>
        );
    }

}

export default HomeCarousel;