import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import "./index.css";

function Screens({imageUrls}) {
    if (imageUrls != []) {
        const [currentSlide, setCurrentSlide] = useState(0);

        const handleSlideChange = (index) => {
            setCurrentSlide(index);
        };

        return (
            <Carousel
                selectedItem={currentSlide}
                onChange={handleSlideChange}
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                >
                    {imageUrls.map((url, index) => (
                        <div key={index}>
                            <img src={url} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
            </Carousel>
        ) ;
    } else {
        return <p></p> ;
    }
}

export default function Game({name, summary, cover, screens}) {

    function Cover(){
        if(cover != "null")
            return (
                <div className='imageCtn'>
                    <img src={cover} alt="cover" className='coverGame'/>
                </div>
            ) ;
    }
    
    return (
        <div id='gamePage'>
            <h3 className='text-center mb-3 mt-5'>{name}</h3>

            <Cover />
            <p className='text-center summary'>{summary}</p>

            
            <Screens imageUrls={screens} id="myCarousel"/>

            
        </div>
        
    ) ;
}