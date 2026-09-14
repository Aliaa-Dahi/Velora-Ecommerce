import useApi from "../../Hooks/useApi";
import SectionTitle from "../SectionTitle/SectionTitle";

const CategorySlider = () => {
  const { data } = useApi("categories");
  const categories = data?.data ?? [];

  if (!categories.length) return null;

  const items = [...categories, ...categories];

  return (
    <div className="mb-8">
      <SectionTitle title="Shop by Category" />
      <div className="overflow-hidden">
        <div className="marquee-track">
          {items.map((category, i) => (
            <div key={`${category._id}-${i}`} className="w-36 sm:w-44 shrink-0 px-2">
              <div className="group cursor-pointer rounded-base overflow-hidden border border-neutral-border bg-neutral-white shadow-card hover:shadow-md hover:border-primary transition-all duration-300">
                <div className="overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-28 sm:h-32 object-cover block transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="py-2 px-3">
                  <h3 className="text-text-heading text-xs sm:text-sm font-semibold text-center truncate group-hover:text-primary transition-colors duration-200">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
