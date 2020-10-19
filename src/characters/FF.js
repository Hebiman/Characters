import React, { useRef } from "react";
import { Quote, Number, SisterSlider } from "../modules";
import { images, Approve } from "../images/ondanya";
import SliderData from "./Miqos";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./FF.scss";

const FF = () => {
  const sliderRef = useRef(null);

  const goTo = (number) => {
    sliderRef && sliderRef.current && sliderRef.current.slickGoTo(number);
  };

  return (
    <div className="FF">
      <h1>O’ndanya Hebi</h1>
      <Quote text="Hi I’m O’ndanya Hebi, my name is quite common so just call me Hebi. :3" />
      <div className="card paragraph">
        <div className="left-side">
          <p>
            Hailing from Gridania now residing in Ul’dah at the time of the
            calamity joining the Flames as a way to make money. After the
            “assassination” of the sultana inpired by the tales of the Warrior
            of Light she takes her positions more seriously going up the ranks
            trying to help the WoL.
          </p>
          <p>
            After some time passed she was chosen by the flames as a replacement
            for the Warrior of Light, since sadly there was no one better
            available, or no one was stupid enough to apply for the position.
          </p>
          <p>
            With the Flames backing her up to some extent she managed to learn a
            lot of different things as well meet the WoL helping them on the
            occasion.
          </p>
        </div>
        <div className="right-side">
          <img src={Approve} alt="O'ndanya Warior Smile" />
        </div>
      </div>
      <Quote text="One and multiple at the same time." />
      <div className="paragraph">
        <p>
          One of ~<Number /> different sisters named by the convention of the
          Moonkeepers.
        </p>
        <p>
          The Miqo seems to be everywhere at the time of need, living a life of
          one and multiple at the same time.
        </p>
        <p>
          The Miqo likes the beast tribes and helps them around. Her motivations
          quite pure as she wants to help those in need.
        </p>
      </div>
      <Quote text="Meet the sisters" />
      <div className="switcher">
        {SliderData.map((val, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className="switcher-button"
          >
            {val.title}
          </button>
        ))}
      </div>
      <div className="meet-the-sisters">
        <SlickSlider className="center" centerMode dots ref={sliderRef}>
          {SliderData.map((sis) => (
            <SisterSlider
              key={sis.title}
              title={sis.title}
              textParagraphs={sis.textParagraphs}
              image={sis.image}
            />
          ))}
        </SlickSlider>
      </div>
      <Quote text="Galery" />
      <div className="galery">
        <SlickSlider className="center" centerMode variableWidth>
          {images.map((val, idx) => (
            <img key={idx} src={val} alt="" />
          ))}
        </SlickSlider>
      </div>
    </div>
  );
};

export default FF;
