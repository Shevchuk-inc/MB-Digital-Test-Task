export interface Course {
  id: string;
  title: string;
  views: string;
  author: string;
  isLive: boolean;
  duration: string;
  videoUrl: string;
  uploadTime: string;
  subscriber: string;
  description: string;
  thumbnailUrl: string;
}

export interface CoursesState {
  items: Course[];
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}
