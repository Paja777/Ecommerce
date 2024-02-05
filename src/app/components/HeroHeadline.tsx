import percentIcon from "../../assets/percent-icon.svg";
import "../../index.css";

const HeroHeadline = () => (
  <div className="z-[4] absolute left-28 top-28">
    <div className="grey-gradient w-[320px] h-[30px] bg-gray-500 rounded-full flex  items-center justify-start text-white">
      <img src={percentIcon} alt="icon" />
      <p>
        20% <span className="text-#A4A4A7">DISCOUNT</span> ON ALL{" "}
        <span>PRODUCTS</span>
      </p>
    </div>
    <p className="headline-hero font-poppins">
      Find your <br />{" "}
      <span className="text-gradient">
        Favorite <br />
      </span>
      ComicBook.
    </p>
    <p className="text-hero w-[31%] mt-5">
      An online comic book store offers a diverse collection of graphic novels,
      rare editions, and the latest superhero adventures, creating a digital
      haven for enthusiasts and collectors alike.
    </p>
  </div>
);

export default HeroHeadline;