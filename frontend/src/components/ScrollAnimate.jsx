import React from 'react'
import image1 from '../assets/images/scroll1.jpg'
import image2 from '../assets/images/scroll2.jpg'
import image3 from '../assets/images/scroll3.jpg'
import image4 from '../assets/images/scroll4.jpg'
import '../style/scroll_animate_page.css'
import { useState, useEffect } from "react";

function Slider({ id, images, direction }) {
  const [slides, setSliders] = useState([]);

    useEffect(() => {
    setSliders([...images, ...images]);

  }, [])

    return (
      <div className="slider" id={id}>
        <div className={` slide-track ${direction === "right" ? "scrollRight" : "scrollLeft" } `}  >
          {slides.map((src, index) => (
            <div className="slide" key={index}>
              <img src={src} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    );
}


const scroll_animate = () => {

  const sliders = [
    {
      id:"slider1",
      images:[ image1, image2, image3, image4, ],
      direction: "left",
      
    },
    {
      id:"slider2",
      images:[ image1, image2, image3, image4 ],
      direction: "right",
      
    },
  ]

  return (
    <section className="sliders-container" >
      {sliders.map((slider) => (
        <Slider 
        key={slider.id}
        images={slider.images}
        direction={slider.direction}
        />
      ))}

    </section>
  )
}

export default scroll_animate