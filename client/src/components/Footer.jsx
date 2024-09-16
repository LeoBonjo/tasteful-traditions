import { FaGithubSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <a href="#">
        <FaGithubSquare
          id="social-icon"
          target="_blank"
          className="h-200 w-12 text-slate-500 hover:text-black duration-300"
        />
      </a>
      <a href="#">
        <FaLinkedin
          id="social-icon"
          target="_blank"
          className="h-8 w-8 text-slate-500 hover:text-black duration-300"
        />
      </a>
      <a href="#">
        <FaTwitterSquare
          id="social-icon"
          className="h-8 w-8 text-slate-500 hover:text-black duration-300"
        />
      </a>
    </div>
  );
};
export default Footer;