import { Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import type { Course } from "../../types/coursesTypes.ts";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  course: Course | null;
}

export const VideoModal = ({ open, onClose, course }: VideoModalProps) => {
  if (!course) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          boxShadow: "none",
          backgroundColor: "transparent",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          top: 8,
          right: 8,
          zIndex: 1,
          color: "white",
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <Close />
      </IconButton>

      <DialogContent sx={{ p: 0, position: "relative", paddingTop: "56.25%" }}>
        <video
          controls
          autoPlay
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "#000",
          }}
          src={course.videoUrl}
          poster={course.thumbnailUrl}
        >
          Your browser does not support the video tag.
        </video>
      </DialogContent>

      <DialogContent sx={{ backgroundColor: "background.paper" }}>
        <Typography variant="h6" fontWeight="bold">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.author} • {course.views} views • {course.uploadTime}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {course.description}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
