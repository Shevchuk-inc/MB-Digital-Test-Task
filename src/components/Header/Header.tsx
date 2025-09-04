import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Badge,
} from "@mui/material";
import { Logout, ShoppingCart } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartTotal, toggleCart } from "../../store/slices/cartSlice";
import { Cart } from "../../features/cart";

const Header = () => {
  const { logout, user } = useAuth();
  const userName = user?.split("")[0];
  const dispatch = useDispatch();
  const cartItemCount = useSelector(selectCartTotal);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleCartClick = () => {
    dispatch(toggleCart());
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "primary.main",
          p: 2,
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h6">MB Digital Courses</Typography>
        <Box display="flex" alignItems="center">
          <Tooltip title="Shopping Cart">
            <IconButton
              size="large"
              sx={{ mr: 1 }}
              color="inherit"
              onClick={handleCartClick}
              aria-label={`${cartItemCount} items in cart`}
            >
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{userName}</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {user}
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Cart />
    </>
  );
};

export { Header };
