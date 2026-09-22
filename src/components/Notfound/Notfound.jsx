import { Link } from "react-router-dom";
import errorImg from "../../assets/images/error.svg";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4">
      <img
        src={errorImg}
        alt="404 - Page not found"
        className="w-full max-w-md"
      />
      <Link
        to="/"
        className="text-white bg-primary hover:bg-primary-strong font-medium text-sm px-6 py-2.5 rounded-base transition-colors shadow-xs"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Notfound;
