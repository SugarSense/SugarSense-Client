import { Link } from "react-router-dom";

function NavbarHome() {
  return (
    <>
      <div className="flex items-center">
        <img
          src="https://cdn.discordapp.com/attachments/1089824944025767996/1090186808614203453/image.png"
          alt="SugarSense"
          className="h-12 w-12 mr-2"
        />
        <h1 className="text-2xl font-bold">SugarSense</h1>
      </div>
      <div className="flex items-center">
        <Link to="/faq" className="text-xl mr-10">
          FAQ
        </Link>
        <a href="#" className="text-xl mr-10">
          Contact
        </a>
        <a href="#" className="text-xl mr-10">
          Log in
        </a>
      </div>
    </>
  );
}

export default NavbarHome;
