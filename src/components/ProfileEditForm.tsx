
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { UserProfile, Skill } from "@/types/profile";

interface ProfileEditFormProps {
  profile: UserProfile;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
  onCancel: () => void;
}

const ProfileEditForm = ({ profile, onSave, onCancel }: ProfileEditFormProps) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [college, setCollege] = useState(profile.college);
  const [bio, setBio] = useState(profile.bio);
  const [skills, setSkills] = useState<Skill[]>(profile.skills);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      const skill = {
        id: `new-${Date.now()}`,
        name: newSkill.trim(),
      };
      setSkills([...skills, skill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      email,
      college,
      bio,
      skills,
    });
  };

  return (
    <Card className="border-skillTrade-purple/20">
      <CardHeader>
        <CardTitle className="text-xl text-skillTrade-purple">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
              />
            </div>

            <div>
              <Label htmlFor="college">College/Department</Label>
              <Input
                id="college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="auth-input"
                required
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="auth-input min-h-[100px]"
                placeholder="Write a short bio about yourself..."
              />
            </div>

            <div>
              <Label htmlFor="skills">Skills</Label>
              <div className="flex items-center gap-2 mb-2">
                <Input
                  id="skills"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="auth-input"
                  placeholder="Add a skill..."
                  onKeyDown={handleKeyDown}
                />
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-skillTrade-purple hover:bg-skillTrade-purpleDark"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill.id}
                    className="bg-skillTrade-gray text-skillTrade-purple hover:bg-skillTrade-gray/80 flex items-center gap-1 py-1"
                  >
                    {skill.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="rounded-full hover:bg-skillTrade-purple/10 p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-skillTrade-purple text-skillTrade-purple hover:bg-skillTrade-gray"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="bg-skillTrade-purple hover:bg-skillTrade-purpleDark text-white"
        >
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileEditForm;
