
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ProfileEditForm from "@/components/ProfileEditForm";
import { UserProfile, Task } from "@/types/profile";
import { Pencil, CheckCircle, Circle } from "lucide-react";

// Mock user data - in a real app, this would come from an API/database
const mockUserProfile: UserProfile = {
  id: "1",
  name: "Alex Johnson",
  email: "alex.j@university.edu",
  college: "School of Computer Science",
  skills: [
    { id: "1", name: "JavaScript" },
    { id: "2", name: "React" },
    { id: "3", name: "UI Design" },
    { id: "4", name: "Python" },
  ],
  bio: "Computer Science major with a passion for web development and AI. Looking to collaborate on innovative projects and share knowledge with peers.",
  tokens: 120,
  tasks: [
    { id: "1", title: "Help with React Assignment", status: "completed", dueDate: "2025-04-15" },
    { id: "2", title: "Python Tutoring Session", status: "pending", dueDate: "2025-04-20" },
    { id: "3", title: "Review Design Project", status: "pending", dueDate: "2025-04-25" },
  ],
  userType: "student",
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileUpdate = (updatedProfile: Partial<UserProfile>) => {
    setProfile({ ...profile, ...updatedProfile });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - reusing from Home page */}
      <nav className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold text-skillTrade-purple">SkillTrade</span>
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/home")}
              className="text-skillTrade-neutral hover:text-skillTrade-purple"
            >
              Home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="border-skillTrade-purple text-skillTrade-purple hover:bg-skillTrade-gray"
            >
              Log out
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {isEditing ? (
          <ProfileEditForm
            profile={profile}
            onSave={handleProfileUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <Avatar className="h-24 w-24 text-lg bg-skillTrade-purple text-white">
                <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
                    <p className="text-skillTrade-neutral">{profile.email}</p>
                    <p className="text-skillTrade-coolGray">{profile.college}</p>
                    <p className="mt-2 text-gray-600">{profile.bio}</p>
                  </div>
                  <Button
                    onClick={handleEditToggle}
                    className="bg-skillTrade-purple hover:bg-skillTrade-purpleDark text-white self-start"
                  >
                    <Pencil className="mr-1 h-4 w-4" /> Edit Profile
                  </Button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge key={skill.id} className="bg-skillTrade-gray text-skillTrade-purple hover:bg-skillTrade-gray/80">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Tokens Card */}
              <Card className="border-skillTrade-purple/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-skillTrade-purple">My Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-skillTrade-purple">{profile.tokens}</div>
                    <p className="text-skillTrade-neutral">
                      Tokens earned through knowledge sharing and skills exchange
                    </p>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="border-skillTrade-purple text-skillTrade-purple hover:bg-skillTrade-gray">
                      View Token History
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tasks Summary Card */}
              <Card className="border-skillTrade-purple/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-skillTrade-purple">Tasks Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-4xl font-bold text-skillTrade-purple">
                        {profile.tasks.length}
                      </span>
                      <span className="text-skillTrade-neutral">Total Tasks</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-4xl font-bold text-green-500">
                        {profile.tasks.filter(task => task.status === "completed").length}
                      </span>
                      <span className="text-skillTrade-neutral">Completed</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-4xl font-bold text-amber-500">
                        {profile.tasks.filter(task => task.status === "pending").length}
                      </span>
                      <span className="text-skillTrade-neutral">Pending</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tasks List */}
            <Card className="border-skillTrade-purple/20 mb-8">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-skillTrade-purple">My Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.tasks.length > 0 ? (
                    profile.tasks.map((task: Task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          {task.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-amber-500" />
                          )}
                          <span
                            className={`${
                              task.status === "completed" ? "line-through text-gray-400" : "text-gray-700"
                            }`}
                          >
                            {task.title}
                          </span>
                        </div>
                        {task.dueDate && (
                          <span className="text-sm text-skillTrade-neutral">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-skillTrade-neutral py-4">No tasks found</p>
                  )}
                </div>
                <div className="mt-4">
                  <Button className="bg-skillTrade-purple hover:bg-skillTrade-purpleDark text-white">
                    View All Tasks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
