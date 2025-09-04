import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import type { Course } from "../../types/coursesTypes.ts";
import { VideoModal } from "../videoModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const CourseCard = ({ course }: { course: Course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBuyClick = () => {
    dispatch(addToCart(course));
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, m: 1 }}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            height="194"
            component="img"
            alt={course.title}
            onClick={handleOpenModal}
            sx={{ cursor: "pointer" }}
            image={course.thumbnailUrl}
          />
          {course.isLive && (
            <Chip
              size="small"
              label="LIVE"
              color="error"
              sx={{
                top: 10,
                right: 10,
                fontWeight: "bold",
                position: "absolute",
              }}
            />
          )}
          <Chip
            label={course.duration}
            size="small"
            sx={{
              right: 10,
              bottom: 10,
              color: "white",
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {course.title}
          </Typography>
          <Box>
            <Typography variant="subtitle1" noWrap>
              {course.description}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {course.author}
          </Typography>
          <Box display="flex" gap={1}>
            <Typography variant="caption" color="text.secondary">
              {course.views} views
            </Typography>
            <Typography variant="caption" color="text.secondary">
              •
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {course.uploadTime}
            </Typography>
          </Box>

          <Button
            color="primary"
            variant="contained"
            sx={{ mt: 2, width: "100%" }}
            onClick={handleBuyClick}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>

      <VideoModal
        open={isModalOpen}
        onClose={handleCloseModal}
        course={course}
      />
    </>
  );
};

export { CourseCard };
