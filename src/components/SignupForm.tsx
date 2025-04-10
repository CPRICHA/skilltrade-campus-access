import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SignupData, UserType } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";

const SignupForm = () => {
  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    userType: "student"
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (value: UserType) => {
    setSignupData(prev => ({ ...prev, userType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!signupData.name || !signupData.email || !signupData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (signupData.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate signup delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      // For now, we're just simulating success
      
      toast({
        title: "Account created!",
        description: "Welcome to SkillTrade! Your account has been created successfully.",
      });
      
      // Redirect to home page
      navigate("/home");
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating your account",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={signupData.name}
          onChange={handleChange}
          className="auth-input"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={signupData.email}
          onChange={handleChange}
          className="auth-input"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={signupData.password}
          onChange={handleChange}
          className="auth-input"
          required
        />
        <p className="text-xs text-skillTrade-coolGray">
          Must be at least 8 characters long
        </p>
      </div>
      
      <div className="space-y-2">
        <Label>I am a:</Label>
        <RadioGroup 
          value={signupData.userType} 
          onValueChange={(value) => handleUserTypeChange(value as UserType)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="student" />
            <Label htmlFor="student" className="cursor-pointer">Student</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="faculty" id="faculty" />
            <Label htmlFor="faculty" className="cursor-pointer">Faculty</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button 
        type="submit" 
        className="w-full auth-button" 
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
      
      <p className="text-xs text-center text-skillTrade-neutral mt-4">
        By signing up, you agree to our <a href="#" className="auth-link">Terms of Service</a> and <a href="#" className="auth-link">Privacy Policy</a>.
      </p>
    </form>
  );
};

export default SignupForm;
