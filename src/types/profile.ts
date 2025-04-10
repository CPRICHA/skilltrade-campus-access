
export interface Skill {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  dueDate?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  skills: Skill[];
  bio: string;
  tokens: number;
  tasks: Task[];
  userType: 'student' | 'faculty';
}
