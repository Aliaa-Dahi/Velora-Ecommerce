import SliderLib from "react-slick";
const Slider = SliderLib.default || SliderLib;
import sliderImg1 from "../../assets/images/slider-image-1.jpeg";
import sliderImg2 from "../../assets/images/slider-2.jpeg";
import sliderImg3 from "../../assets/images/slider-image-3.jpeg";
import sideImg1 from "../../assets/images/grocery-banner.png";
import sideImg2 from "../../assets/images/grocery-banner-2.jpeg";

const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 600,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex mb-8 rounded-base overflow-hidden shadow-card">
      {/* Main auto-playing slider — 3/4 width */}
      <div className="w-3/4">
        <Slider {...settings}>
          {[sliderImg1, sliderImg2, sliderImg3].map((src, i) => (
            <div key={i}>
              <img
                className="w-full h-80 object-cover block"
                src={src}
                alt={`Slide ${i + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Static side banners — 1/4 width */}
      <div className="w-1/4 flex flex-col">
        <img
          src={sideImg1}
          className="w-full h-40 object-cover block"
          alt="Banner 1"
        />
        <img
          src={sideImg2}
          className="w-full h-40 object-cover block"
          alt="Banner 2"
        />
      </div>
    </div>
  );
};

export default MainSlider;
