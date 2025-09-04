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
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
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
      <DialogContent>
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
                  secondaryAction={
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Box
                      component="img"
                      alt={item.title}
                      sx={{
                        width: 64,
                        height: 48,
                        borderRadius: 1,
                        objectFit: "cover",
                      }}
                      src={item.thumbnailUrl}
                    />
                  </ListItemAvatar>
                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography variant="subtitle2" noWrap>
                      {item.title}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mr: 2 }}
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
                          style: { width: "60px", textAlign: "center" },
                        }}
                        sx={{ mr: 2 }}
                      />
                      <Typography variant="subtitle1">
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
              justifyContent="space-between"
            >
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${totalPrice}</Typography>
            </Box>
            <Button
              fullWidth
              size="large"
              color="primary"
              variant="contained"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
