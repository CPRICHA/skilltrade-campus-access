import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import TaskCard from "@/components/TaskCard";
import TaskFilter from "@/components/TaskFilter";
import { useState } from "react";

// Mock data for task feed
const mockTasks = [
  {
    id: "1",
    title: "Research Assistant for Biology Project",
    description: "Looking for a student to help with research data collection and analysis for a biology project on plant growth patterns.",
    tokens: 50,
    deadline: "May 15, 2025",
    postedBy: "Dr. Sarah Johnson",
    skillMatch: 85,
    category: "research"
  },
  {
    id: "2",
    title: "Web Application Development",
    description: "Need a developer to create a simple scheduling app for the Computer Science department.",
    tokens: 75,
    deadline: "April 25, 2025",
    postedBy: "Prof. Mike Chen",
    skillMatch: 92,
    category: "technical"
  },
  {
    id: "3",
    title: "Literature Review Helper",
    description: "Seeking assistance with compiling and summarizing research papers for an English Literature course.",
    tokens: 30,
    deadline: "May 5, 2025",
    postedBy: "Dr. Emily Rodriguez",
    skillMatch: 70,
    category: "writing"
  },
  {
    id: "4",
    title: "Design Flyers for Campus Event",
    description: "Create promotional materials for the upcoming campus sustainability fair.",
    tokens: 25,
    deadline: "April 18, 2025",
    postedBy: "Student Council",
    category: "design"
  },
  {
    id: "5",
    title: "Statistics Tutoring",
    description: "Help needed to tutor a small group of undergraduate students in basic statistics concepts.",
    tokens: 60,
    deadline: "Ongoing",
    postedBy: "Prof. Alan White",
    skillMatch: 88,
    category: "academic"
  }
];

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filteredTasks, setFilteredTasks] = useState(mockTasks);
  const [filters, setFilters] = useState({ category: "all", deadline: "all" });

  const handleLogout = () => {
    // In a real app, this would clear auth tokens
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  const handleFilterChange = (newFilters: { category: string; deadline: string }) => {
    setFilters(newFilters);
    
    let filtered = [...mockTasks];
    
    // Filter by category
    if (newFilters.category !== "all") {
      filtered = filtered.filter(task => task.category === newFilters.category);
    }
    
    // Filter by deadline
    if (newFilters.deadline !== "all") {
      const today = new Date();
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(today.getDate() + 7);
      
      const oneMonthLater = new Date(today);
      oneMonthLater.setMonth(today.getMonth() + 1);
      
      filtered = filtered.filter(task => {
        if (task.deadline === "Ongoing") return true;
        
        const taskDate = new Date(task.deadline);
        if (newFilters.deadline === "week") {
          return taskDate <= oneWeekLater;
        } else if (newFilters.deadline === "month") {
          return taskDate <= oneMonthLater;
        }
        return true;
      });
    }
    
    setFilteredTasks(filtered);
  };

  const handlePostTask = () => {
    navigate("/post-task");
  };

  return (
    <div className="min-h-screen bg-skillTrade-gray/20">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold text-skillTrade-purple">SkillTrade</span>
          <div className="flex space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/profile")}
              className="text-skillTrade-neutral hover:text-skillTrade-purple"
            >
              My Profile
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-skillTrade-purple text-skillTrade-purple hover:bg-skillTrade-gray"
            >
              Log out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Task Feed</h1>
          <Button 
            onClick={handlePostTask}
            className="bg-skillTrade-purple hover:bg-skillTrade-purpleDark text-white"
          >
            <Plus className="h-5 w-5 mr-1" /> Post a Task
          </Button>
        </div>

        <TaskFilter onFilterChange={handleFilterChange} />

        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard 
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                tokens={task.tokens}
                deadline={task.deadline}
                postedBy={task.postedBy}
                skillMatch={task.skillMatch}
                category={task.category}
              />
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg text-center">
              <p className="text-skillTrade-neutral">No tasks match your current filters.</p>
              <Button 
                variant="ghost" 
                onClick={() => handleFilterChange({ category: "all", deadline: "all" })}
                className="mt-2 text-skillTrade-purple"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
