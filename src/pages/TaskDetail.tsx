
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Coins, User, CheckCheck, Clock, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Mock data - In a real app, this would come from an API
const mockTaskDetails = {
  "1": {
    id: "1",
    title: "Research Assistant for Biology Project",
    description: "Looking for a student to help with research data collection and analysis for a biology project on plant growth patterns. Responsibilities include setting up experiments, collecting data, and assisting with basic analysis. Knowledge of Excel and basic statistical methods is required. The project runs for 4 weeks and will require approximately 10 hours per week. Flexible timing except for weekly team meetings.",
    tokens: 50,
    deadline: "May 15, 2025",
    postedBy: {
      id: "user1",
      name: "Dr. Sarah Johnson"
    },
    category: "research",
    skillsRequired: ["Biology", "Data Analysis", "Excel"]
  },
  "2": {
    id: "2",
    title: "Web Application Development",
    description: "Need a developer to create a simple scheduling app for the Computer Science department. The app should allow professors to post their office hours and students to book appointments. Requirements include authentication, calendar view, and email notifications. Experience with React and Node.js is preferred.",
    tokens: 75,
    deadline: "April 25, 2025",
    postedBy: {
      id: "user2",
      name: "Prof. Mike Chen"
    },
    assignee: {
      id: "user5",
      name: "Jane Smith"
    },
    category: "technical",
    skillsRequired: ["React", "NodeJS", "Web Development"]
  },
  "3": {
    id: "3",
    title: "Literature Review Helper",
    description: "Seeking assistance with compiling and summarizing research papers for an English Literature course. The task involves finding relevant academic papers on modernist literature, creating an annotated bibliography, and writing short summaries of each paper. Good writing skills and access to academic databases are required.",
    tokens: 30,
    deadline: "May 5, 2025",
    postedBy: {
      id: "user3",
      name: "Dr. Emily Rodriguez"
    },
    category: "writing",
    skillsRequired: ["Research", "Academic Writing", "Literature"]
  },
  "4": {
    id: "4",
    title: "Design Flyers for Campus Event",
    description: "Create promotional materials for the upcoming campus sustainability fair. Need 3 different flyer designs, a banner for social media, and a poster for the student center. Creative freedom is encouraged, but designs should incorporate the event's green theme and include all relevant event details (date, time, location, activities).",
    tokens: 25,
    deadline: "April 18, 2025",
    postedBy: {
      id: "user4",
      name: "Student Council"
    },
    category: "design",
    skillsRequired: ["Graphic Design", "Illustrator/Photoshop", "Creativity"]
  },
  "5": {
    id: "5",
    title: "Statistics Tutoring",
    description: "Help needed to tutor a small group of undergraduate students in basic statistics concepts. Topics include probability distributions, hypothesis testing, and regression analysis. Sessions will be 1.5 hours, twice a week for 3 weeks. Previous tutoring experience and strong knowledge of undergraduate statistics required.",
    tokens: 60,
    deadline: "Ongoing",
    postedBy: {
      id: "user1",
      name: "Prof. Alan White"
    },
    category: "academic",
    skillsRequired: ["Statistics", "Teaching", "Patience"]
  }
};

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, you would fetch this data from an API
  const task = mockTaskDetails[id as keyof typeof mockTaskDetails];
  
  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Task not found</h1>
        <Button onClick={() => navigate("/home")}>Back to Tasks</Button>
      </div>
    );
  }
  
  const handleTakeTask = () => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Task Accepted",
        description: `You've successfully taken up "${task.title}"`,
      });
      navigate("/home");
    }, 1000);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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
              onClick={() => {
                toast({
                  title: "Logged out",
                  description: "You have been logged out successfully",
                });
                navigate("/");
              }}
              className="border-skillTrade-purple text-skillTrade-purple hover:bg-skillTrade-gray"
            >
              Log out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 text-skillTrade-neutral"
        >
          ← Back to tasks
        </Button>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
              <Badge variant="outline" className="mt-2 bg-skillTrade-purple/10 text-skillTrade-purple">
                {task.category}
              </Badge>
            </div>
            <div className="text-right">
              <div className="flex items-center text-skillTrade-neutral mb-2">
                <Coins className="h-5 w-5 mr-2 text-skillTrade-purple" />
                <span className="font-medium text-lg">{task.tokens} tokens</span>
              </div>
              <div className="flex items-center text-skillTrade-neutral">
                <Clock className="h-5 w-5 mr-2 text-skillTrade-purple" />
                <span>Due: {task.deadline}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Description</h2>
            <p className="text-skillTrade-neutral">{task.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Skills Required</h2>
            <div className="flex flex-wrap gap-2">
              {task.skillsRequired.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-skillTrade-gray">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-end border-t border-gray-100 pt-6">
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center text-skillTrade-neutral cursor-pointer hover:text-skillTrade-purple">
                  <Avatar className="h-10 w-10 mr-2 border border-skillTrade-gray">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${task.postedBy.name}`} />
                    <AvatarFallback>{getInitials(task.postedBy.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">Posted by</p>
                    <p className="font-medium">{task.postedBy.name}</p>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex flex-col space-y-1">
                  <h3 className="font-semibold">{task.postedBy.name}</h3>
                  <p className="text-sm text-muted-foreground">Faculty Member</p>
                  <Link 
                    to={`/profile/${task.postedBy.id}`} 
                    className="text-skillTrade-purple text-sm hover:underline mt-2"
                  >
                    View Profile
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
            
            {task.assignee ? (
              <div className="flex items-center px-4 py-2 rounded-md bg-green-50 text-green-800">
                <CheckCheck className="h-5 w-5 mr-2" />
                <div>
                  <span className="text-sm font-medium">Task Assigned to</span>
                  <p>{task.assignee.name}</p>
                </div>
              </div>
            ) : (
              <Button 
                onClick={handleTakeTask} 
                className="bg-skillTrade-purple hover:bg-skillTrade-purpleDark text-white"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Take Up Task"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
