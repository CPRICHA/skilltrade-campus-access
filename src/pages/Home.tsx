
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/toast";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // In a real app, this would clear auth tokens
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold text-skillTrade-purple">SkillTrade</span>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-skillTrade-purple text-skillTrade-purple hover:bg-skillTrade-gray"
          >
            Log out
          </Button>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to SkillTrade!</h1>
        <p className="text-lg text-skillTrade-neutral max-w-2xl mx-auto mb-8">
          You've successfully logged in to the platform. This is where your dashboard and main content would appear.
        </p>
        <div className="bg-skillTrade-gray p-8 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h2>
          <p className="text-skillTrade-neutral mb-4">
            SkillTrade is a platform where students and faculty can exchange knowledge and skills in a collaborative campus environment.
          </p>
          <Button className="bg-skillTrade-purple hover:bg-skillTrade-purpleDark text-white">
            Explore Skills
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
