import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartIsOpen,
  closeCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../store/slices/cartSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const isOpen = useSelector(selectCartIsOpen);

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", items);
    dispatch(clearCart());
    handleClose();
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items
    .reduce((sum, item) => sum + item.quantity * 9.99, 0)
    .toFixed(2);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={window.innerWidth < 600}
      PaperProps={{
        sx: {
          m: 0,
          maxHeight: "100vh",
          "@media (min-width: 600px)": {
            m: 2,
            maxHeight: "90vh",
          },
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent
        sx={{
          p: { xs: 1, sm: 2 },
          "&.MuiDialogContent-root": {
            padding: { xs: "8px", sm: "16px" },
          },
        }}
      >
        {items.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="subtitle1">Your cart is empty</Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Add some courses to get started!
            </Typography>
          </Box>
        ) : (
          <>
            <List>
              {items.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    p: { xs: 1, sm: 2 },
                    alignItems: "flex-start",
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      color="error"
                      size="small"
                      sx={{
                        top: { xs: -4, lg: -4 },
                        right: { xs: -2, lg: -4 },
                        position: "absolute",
                      }}
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemAvatar
                    sx={{ minWidth: { xs: 56, sm: 64 }, mt: 0.5 }}
                  >
                    <Box
                      component="img"
                      alt={item.title}
                      sx={{
                        borderRadius: 1,
                        objectFit: "cover",
                        width: { xs: 48, sm: 64 },
                        height: { xs: 36, sm: 48 },
                      }}
                      src={item.thumbnailUrl}
                    />
                  </ListItemAvatar>
                  <Box
                    sx={{
                      pr: 4,
                      flex: 1,
                      overflow: "hidden",
                      ml: { xs: 1, sm: 2 },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{
                        mb: 0.5,
                        lineHeight: 1.2,
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Box
                      mt={1}
                      gap={1}
                      display="flex"
                      flexWrap="wrap"
                      alignItems="center"
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mr: 1,
                          minWidth: "40px",
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        }}
                      >
                        $9.99
                      </Typography>
                      <TextField
                        size="small"
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value) || 1,
                          )
                        }
                        inputProps={{
                          min: 1,
                          style: {
                            margin: 0,
                            width: "50px",
                            padding: "8px 4px",
                            textAlign: "center",
                            WebkitAppearance: "none",
                          },
                        }}
                        sx={{
                          mr: 1,
                          "& .MuiOutlinedInput-root": {
                            maxHeight: "32px",
                          },
                          "& input[type=number]": {
                            "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button":
                              {
                                WebkitAppearance: "none",
                                margin: 0,
                              },
                            MozAppearance: "textfield",
                          },
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          ml: "auto",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        ${(item.quantity * 9.99).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box
              mb={2}
              display="flex"
              alignItems="center"
              px={{ xs: 1, sm: 0 }}
              justifyContent="space-between"
            >
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
              >
                Total:
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
              >
                ${totalPrice}
              </Typography>
            </Box>
            <Box px={{ xs: 1, sm: 0 }}>
              <Button
                fullWidth
                size="large"
                color="primary"
                variant="contained"
                onClick={handleCheckout}
                sx={{
                  py: 1.5,
                  fontWeight: 500,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                    textTransform: "none",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  },
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
