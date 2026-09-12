import axios from "axios";
import { useEffect, useState } from "react";
import SliderLib from "react-slick";
import SectionTitle from "../SectionTitle/SectionTitle";
const Slider = SliderLib.default || SliderLib;

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);

  function getAllCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 600,
    autoplaySpeed: 50,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 640,  settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="mb-8">
      <SectionTitle title="Shop by Category" />
      <Slider {...settings}>
        {categories?.map((category) => (
          <div key={category.id} className="px-2">
            <div className="group cursor-pointer rounded-base overflow-hidden border border-neutral-border bg-neutral-white shadow-card hover:shadow-md hover:border-primary transition-all duration-300">
              <div className="overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-36 object-cover block transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="py-2 px-3">
                <h3 className="text-text-heading text-sm font-semibold text-center truncate group-hover:text-primary transition-colors duration-200">
                  {category.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySlider;
