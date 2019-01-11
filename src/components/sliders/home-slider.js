import React from "react";
import Slider from "react-slick";
import { css } from 'emotion'

import bgBanner1 from '../../images/background-video-banner.mp4'
import bgBanner2 from '../../images/kid-build-density-840b16a36986a010aa844b39b4d63897032ca2092715aecce9cf06fbb23ce3fa.jpg'
import SliderContent from '../sliders/home-slider-content'
import SliderBackground from '../sliders/home-slider-background'
import SliderArrow from '../sliders/slider-arrow'

class HomeSlider extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      index:0
    }
  }
  render() {
    var settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      className: 'mb-5',
      adaptiveHeight: true,
      autoplaySpeed: 5000,
      prevArrow: <SliderArrow to="prev" />,
      nextArrow: <SliderArrow to="next" />,
      fade:true,
      afterChange: (index) => this.setState({index})
    };
    return (
      <Slider {...settings}>
        <div css={css`position: relative;`}>
          <SliderBackground
            isVideo={true}
            src={bgBanner1}
          />
          <SliderContent
            title='If you can dream it, we can code it'
            subTitle='We develop stunning web and mobile app'
            isActive= {this.state.index === 0}
          />
        </div>
        <div css={css`position: relative;`}>
          <SliderBackground
            alt="Innovative Solutions Background"
            src={bgBanner2}
          />
          <SliderContent
            title='Innovative solutions for demanding challenges'
            subTitle="Let's get you started today. We plan to delight you."
            isActive= {this.state.index === 1}
          />
        </div>
      </Slider>
    );
  }
}

export default HomeSlider
