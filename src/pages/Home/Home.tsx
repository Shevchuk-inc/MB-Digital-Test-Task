import { Header } from "../../components/Header";
import { CourseList } from "../../features/courseList";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { useEffect } from "react";
import { fetchCourses } from "../../store/slices/coursesSlice.ts";

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    items: courses,
    status,
    error,
  } = useAppSelector((state) => state.courses);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  return (
    <>
      <Header />
      <CourseList
        courses={courses}
        loading={status === "loading"}
        error={error}
      />
    </>
  );
};

export default Home;
