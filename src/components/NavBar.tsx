
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-sm py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-skillTrade-purple">SkillTrade</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="border-skillTrade-purple text-skillTrade-purple hover:bg-skillTrade-gray">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-skillTrade-purple hover:bg-skillTrade-purpleDark text-white">Sign up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
