
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("login");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left side - Content */}
        <div className="lg:w-1/2 bg-white flex flex-col justify-center px-8 py-12 lg:px-16">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-skillTrade-purple mb-6">
              Share Knowledge, Learn Together
            </h1>
            <p className="text-lg text-skillTrade-neutral mb-8">
              SkillTrade is a platform where students and faculty can exchange knowledge and skills in a collaborative campus environment.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-skillTrade-purple hover:bg-skillTrade-purpleDark text-white"
                onClick={() => setActiveTab("signup")}
              >
                Join SkillTrade
              </Button>
              <Button 
                variant="outline" 
                className="border-skillTrade-purple text-skillTrade-purple hover:bg-skillTrade-gray"
                onClick={() => setActiveTab("login")}
              >
                Log in
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - Auth */}
        <div className="lg:w-1/2 bg-skillTrade-blue/30 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login" className="text-base">Log in</TabsTrigger>
                <TabsTrigger value="signup" className="text-base">Sign up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="mt-0">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <LoginForm />
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-0">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <SignupForm />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
