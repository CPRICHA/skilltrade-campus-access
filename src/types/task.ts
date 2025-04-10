
export interface TaskDetail {
  id: string;
  title: string;
  description: string;
  tokens: number;
  deadline: string;
  postedBy: {
    id: string;
    name: string;
  };
  assignee?: {
    id: string;
    name: string;
  };
  category: string;
  skillsRequired: string[];
}
