import SectionTitle from "../SectionTitle/SectionTitle";
import StarRating from "../StarRating/StarRating";

const Reviews = (reviews) => {
    console.log(reviews)
  return (
    <div className="mt-10">
      <SectionTitle title="Customer Reviews" />
      <div className="flex flex-col gap-4">
        {reviews?.reviews.map((review) => (
          <div
            key={review._id}
            className="bg-neutral-bg-soft border border-neutral-border rounded-base p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-soft flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  {review.user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <span className="text-text-heading text-sm font-semibold block">
                    {review.user?.name || "Anonymous"}
                  </span>
                  <span className="text-text-muted text-xs">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <StarRating
                rating={review.rating ?? review.ratings ?? 0}
                size="text-sm"
              />
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              {review.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
