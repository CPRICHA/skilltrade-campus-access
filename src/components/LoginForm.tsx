
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCredentials } from "@/types/auth";
import { useToast } from "@/components/ui/toast";

const LoginForm = () => {
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      // For now, we're just simulating success
      
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      
      // Redirect to home page
      navigate("/home");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={credentials.email}
          onChange={handleChange}
          className="auth-input"
          required
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="#" className="text-xs auth-link">Forgot password?</a>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={credentials.password}
          onChange={handleChange}
          className="auth-input"
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full auth-button" 
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
};

export default LoginForm;
