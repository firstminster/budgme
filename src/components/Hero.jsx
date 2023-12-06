import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-cta">
        <h1 className="hero-title">
          Transform Your Financial Future
          <span className="">
            {" "}
            with <span className="">Our Budget Tracker</span>.
          </span>
        </h1>

        <p className="hero-description">
          With our user-friendly platform, you can easily track our income and
          expenses, set budgets, and create a plan to achieve your financial
          goals.
        </p>

        <div className="">
          <Link to="/register" className="hero-cta_btn">
            Get Started
          </Link>
        </div>
      </div>
      <div className="">
        <img src={"/images/app-demo.png"} alt="" width={300} height={550} />
      </div>
    </div>
  );
};

export default Hero;
