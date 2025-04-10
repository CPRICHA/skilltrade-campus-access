
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, Coins, FileText, Tags, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  skills: z.string().min(3, { message: "Please enter at least one skill" }),
  deadline: z.date({
    required_error: "Please select a deadline",
  }),
  tokens: z.number().min(1, { message: "Must offer at least 1 token" }).max(100),
  attachment: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const PostTask = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      skills: "",
      tokens: 10,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    
    // Here you would typically send the data to your backend API
    
    toast({
      title: "Success!",
      description: "Your task has been posted.",
    });
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      navigate("/home");
    }, 1500);
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

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Post a New Task</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear title that describes the task
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the task in detail..." 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide as much detail as possible to help others understand the task
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills Required</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Tags className="h-4 w-4 mr-2 text-skillTrade-purple" />
                        <Input 
                          placeholder="e.g. Python, Data Analysis, Research" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Comma-separated list of skills needed for this task
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <Clock className="mr-2 h-4 w-4 text-skillTrade-purple" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The date by which the task needs to be completed
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tokens"
                render={({ field: { onChange, value, ...restField } }) => (
                  <FormItem>
                    <FormLabel>Tokens Offered</FormLabel>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-skillTrade-purple" />
                        <span className="font-medium">{value || 0} tokens</span>
                      </div>
                      <FormControl>
                        <Slider
                          min={1}
                          max={100}
                          step={1}
                          defaultValue={[value || 10]}
                          onValueChange={(vals) => onChange(vals[0])}
                          className="w-full"
                        />
                      </FormControl>
                    </div>
                    <FormDescription>
                      The number of tokens you're offering for this task
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="attachment"
                render={({ field: { onChange, value, ...restField } }) => (
                  <FormItem>
                    <FormLabel>Attachment (Optional)</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-skillTrade-purple" />
                        <Input
                          type="file"
                          onChange={(e) => onChange(e.target.files)}
                          className="cursor-pointer"
                          {...restField}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload any relevant files (max 10MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/home")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-skillTrade-purple hover:bg-skillTrade-purpleDark"
                >
                  <Upload className="h-4 w-4 mr-2" /> Post Task
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PostTask;
