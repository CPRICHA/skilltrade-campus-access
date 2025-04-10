
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Coins, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  title: string;
  description: string;
  tokens: number;
  deadline: string;
  postedBy: string;
  skillMatch?: number;
  category: string;
}

const TaskCard = ({ 
  title, 
  description, 
  tokens, 
  deadline, 
  postedBy, 
  skillMatch, 
  category 
}: TaskCardProps) => {
  return (
    <Card className="w-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <Badge variant="outline" className="bg-skillTrade-purple/10 text-skillTrade-purple">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-2">
        <p className="text-skillTrade-neutral text-sm">{description}</p>
        
        <div className="flex items-center text-sm text-skillTrade-neutral">
          <Coins className="h-4 w-4 mr-2 text-skillTrade-purple" />
          <span className="font-medium">{tokens} tokens</span>
        </div>
        
        <div className="flex items-center text-sm text-skillTrade-neutral">
          <Calendar className="h-4 w-4 mr-2 text-skillTrade-purple" />
          <span>Due: {deadline}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center border-t border-gray-100">
        <div className="flex items-center text-sm">
          <User className="h-4 w-4 mr-2 text-skillTrade-purple" />
          <span>{postedBy}</span>
          {skillMatch !== undefined && (
            <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">
              {skillMatch}% match
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" className="text-skillTrade-purple hover:text-skillTrade-purpleDark hover:bg-skillTrade-gray">
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
