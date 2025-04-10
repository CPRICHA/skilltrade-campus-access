
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, List } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TaskFilterProps {
  onFilterChange: (filter: { category: string; deadline: string }) => void;
}

const TaskFilter = ({ onFilterChange }: TaskFilterProps) => {
  const [category, setCategory] = React.useState("all");
  const [deadline, setDeadline] = React.useState("all");

  const handleCategoryChange = (value: string) => {
    const newCategory = value || "all";
    setCategory(newCategory);
    onFilterChange({ category: newCategory, deadline });
  };

  const handleDeadlineChange = (value: string) => {
    setDeadline(value);
    onFilterChange({ category, deadline: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-skillTrade-purple" />
          <h3 className="font-medium text-gray-800">Filter Tasks</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
          <div className="flex items-center gap-2">
            <List className="h-4 w-4 text-skillTrade-neutral" />
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <ToggleGroup type="single" value={deadline} onValueChange={handleDeadlineChange}>
              <ToggleGroupItem value="all" className="text-sm">
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="week" className="text-sm">
                <Calendar className="h-3 w-3 mr-1" />
                This Week
              </ToggleGroupItem>
              <ToggleGroupItem value="month" className="text-sm">
                <Calendar className="h-3 w-3 mr-1" />
                This Month
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
