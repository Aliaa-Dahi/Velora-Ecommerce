import useApi from "../../Hooks/useApi";
import SectionTitle from "../SectionTitle/SectionTitle";

const BrandsSlider = () => {
  const { data } = useApi("brands");
  const brands = data?.data ?? [];

  if (!brands.length) return null;

  // Duplicate for seamless infinite scroll
  const items = [...brands, ...brands];

  return (
    <div className="mb-10">
      <SectionTitle title="Top Brands" />
      <div className="overflow-hidden">
        {/* Runs in reverse direction to differentiate from CategorySlider */}
        <div className="marquee-track" style={{ animationDirection: "reverse" }}>
          {items.map((brand, i) => (
            <div key={`${brand._id}-${i}`} className="w-28 sm:w-36 shrink-0 px-2">
              <div className="group cursor-default rounded-base overflow-hidden border border-neutral-border bg-neutral-white shadow-card hover:shadow-md hover:border-primary transition-all duration-300">
                <div className="p-3 flex items-center justify-center h-20 sm:h-24 bg-neutral-bg-soft overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="py-1.5 px-2">
                  <p className="text-text-heading text-xs font-semibold text-center truncate group-hover:text-primary transition-colors duration-200">
                    {brand.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsSlider;
