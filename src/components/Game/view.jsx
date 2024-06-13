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

export default function Game({name, summary, cover, screens, compagnies, handleAdd, handleRemove, isFavorite}) {

    function Cover(){
        if(cover != "null")
            return (
                <div className='imageCtn'>
                    <img src={cover} alt="cover" className='coverGame'/>
                </div>
            ) ;
    }

    function Compagnies() {
        if(compagnies.length != 0 ){
            console.log("cccccc")
            return (
                <>
                    <h4 className='mt-5'>Compagnies impliquées : </h4>
                    {compagnies.map((tab) => (
                        <div key={tab[0]}>
                            <a href={`/company/${tab[0]}`} className='aComp'>{tab[1]}</a>
                        </div>
                    ))}
                </> 
            ) ;
        }
            
    }

    let button = <button className='btn btn-outline-warning' type='button' onClick={handleAdd}>Add to fav</button> ;
    if(isFavorite) {
        button = <button className='btn btn-outline-danger' type='button' onClick={handleRemove}>Remove from fav</button>;
    }
    
    return (
        <div id='gamePage'>
            <h3 className='text-center mb-3 mt-5'>{name}</h3>

            <Cover />
            <p className='text-center summary'>{summary}</p>

            
            <Screens imageUrls={screens} id="myCarousel"/>

            <Compagnies />

            <div id='buttons'>
                {button}
            </div>

            
        </div>
        
    ) ;
}