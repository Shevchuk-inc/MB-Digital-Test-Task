import { Box, CircularProgress, Typography } from "@mui/material";
import type { Course } from "../../types/coursesTypes.ts";
import { CourseCard } from "../courseCard/CourseCard.tsx";

interface CourseListProps {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const CourseList = ({ courses, loading, error }: CourseListProps) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (courses.length === 0) {
    return (
      <Box p={4}>
        <Typography>No courses found</Typography>
      </Box>
    );
  }

  return (
    <Box
      p={2}
      gap={3}
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
    >
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Box>
  );
};

export { CourseList };
