import {Component} from 'react'
import Slider from 'react-slick'
import './index.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  renderSlider = () => {
    const {details} = this.props
    return (
      <Slider {...settings}>
        {details.map(eachLogo => {
          const {storyUrl} = eachLogo
          return (
            <div className="slick-item" key={storyUrl}>
              <img className="story-image" src={storyUrl} alt="user story" />
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default ReactSlick
