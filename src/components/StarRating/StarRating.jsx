
const StarRating = ({ rating, size = "text-base" }) => {

        return (
          <div className={`flex gap-0.5 ${size}`}>
            {Array(5)
              .fill(null)
              .map((_, i) => {
                const fill = Math.min(Math.max(rating - i, 0), 1); // 0 to 1
                const percent = Math.round(fill * 100);
                return (
                  <span key={i} className="relative inline-block w-[1em] h-[1em]">
                    {/* Gray base star */}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-full h-full fill-neutral-border absolute top-0 left-0"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {/* Yellow fill star clipped to percent */}
                    {percent > 0 && (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-full h-full absolute top-0 left-0"
                        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
                      >
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                          fill="#facc15"
                        />
                      </svg>
                    )}
                  </span>
                );
              })}
          </div>
        );
}

export default StarRating
