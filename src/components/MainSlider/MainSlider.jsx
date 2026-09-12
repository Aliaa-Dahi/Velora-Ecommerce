import SliderLib from "react-slick";
const Slider = SliderLib.default || SliderLib;
import sliderImg1 from "../../assets/images/slider-image-1.jpeg";
import sliderImg2 from "../../assets/images/slider-2.jpeg";
import sliderImg3 from "../../assets/images/slider-image-3.jpeg";

const MainSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false ,     
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="flex">
      <div className="w-9/12">
        <Slider {...settings}>
          <div className="">
            <img className="w-full h-96 object-cover" src={sliderImg1} />
          </div>
          <div>
            <img className="w-full h-96 object-cover" src={sliderImg2} />
          </div>
          <div>
            <img className="w-full h-96 object-cover" src={sliderImg3} />
          </div>
        </Slider>
      </div>
      <div className="w-3/12">
        <div>
            <img src={sliderImg1} className="h-48 object-cover" />
            <img src={sliderImg2} className="h-48 object-cover"/>
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
