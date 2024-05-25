
import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Close } from "@mui/icons-material";
import { useGetproductByNameQuery } from "../../Redux/product";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux"; 
import { addToCart, removeFromCart } from "../../Redux/cartReducer"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Button, CircularProgress, Container, Dialog, IconButton, Rating, Stack, Typography, useTheme } from "@mui/material";


const Main = () => {
  const [cartBtn, setCartBtn] = useState('Add to Cart'); // État du bouton du panier
  const dispatch = useDispatch(); // Initialiser dispatch pour accéder aux actions Redux

  const handleAlignment = (event, newValue) => {
    if (newValue !== null) {
      setMyDate(newValue);
    }
  };
  const handleCart = (product) => {
    const isProductInCart = cartProducts.some((item) => item.id === product.id);
  
    if (!isProductInCart) {
      // Dispatch de l'action pour ajouter au panier
      dispatch(addToCart(product));
      setCartProducts([...cartProducts, product]);
      setCartBtn('Remove from Cart'); // Mettre à jour le texte du bouton
    } else {
      // Dispatch de l'action pour supprimer du panier
      dispatch(removeFromCart(product));
      setCartProducts(cartProducts.filter((item) => item.id !== product.id));
      setCartBtn('Add to Cart'); // Mettre à jour le texte du bouton
    }
  };
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [selectedImg, setSelectedImg] = useState(0);
  const [clickedProduct, setClickedProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCartOpen = () => {
    setCartOpen(true);
    setCartProducts([...cartProducts, clickedProduct]);
  };

  const handleClose = () => {
    setOpen(false);
    setCartOpen(false);
  };

  const allProductsAPI = "products?populate=*";
  const menCategoryAPI = "products?populate=*&filters[category][$eq]=cup";
  const womenCategoryAPI = "products?populate=*&filters[category][$eq]=sticker";

  const [myDate, setMyDate] = useState(allProductsAPI);
  const { data, error, isLoading } = useGetproductByNameQuery(myDate);

  if (isLoading) {
    return (
      <Box sx={{ py: 11, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          py: 11,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{error.error}</Typography>
        <Typography variant="h6">Please try again later</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 9 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Box>
          <Typography variant="h6">Selected Products</Typography>
          <Typography fontWeight={300} variant="body1">
            All our new arrivals in an exclusive brand selection
          </Typography>
        </Box>

        <ToggleButtonGroup
          color="error"
          value={myDate}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          sx={{
            ".Mui-selected": {
              border: "1px solid rgba(233, 69, 96, 0.5) !important",
              color: "#e94560",
              backgroundColor: "initial",
            },
          }}
        >
          <ToggleButton
            sx={{ color: theme.palette.text.primary }}
            className="myButton"
            value={allProductsAPI}
            aria-label="left aligned"
          >
            All Products
          </ToggleButton>

          <ToggleButton
            sx={{ mx: "16px !important", color: theme.palette.text.primary }}
            className="myButton"
            value={menCategoryAPI}
            aria-label="centered"
          >
             Cup category
          </ToggleButton>

          <ToggleButton
            sx={{ color: theme.palette.text.primary }}
            className="myButton"
            value={womenCategoryAPI}
            aria-label="right aligned"
          >
           sticker category
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <AnimatePresence>
          {data &&
            data.data.map((item) => (
              <Card
                component={motion.section}
                layout
                initial={{ transform: "scale(0)" }}
                animate={{ transform: "scale(1)" }}
                transition={{ duration: 1.6, type: "spring", stiffness: 50 }}
                key={item.id}
                sx={{
                  maxWidth: 333,
                  mt: 6,
                  ":hover .MuiCardMedia-root ": {
                    rotate: "1deg",
                    scale: "1.1",
                    transition: "0.35s",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 277 }}
                  image={`http://localhost:1337${item.attributes.productImg.data[0].attributes.url}`}
                  title="green iguana"
                />

                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {item.attributes.productTitle}
                    </Typography>

                    <Typography
                      variant="h6"
                      component="div"
                      color={"crimson"}
                      fontWeight={400}
                    >
                      ${item.attributes.productPrise}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {item.attributes.productDescription}
                  </Typography>
                </CardContent>

                <CardActions sx={{ display: "flex", justifyContent: "end" }}>
                <Button  onClick={() => handleCart(item)}>
                      {cartProducts.some((product) => product.id === item.id) ? 'Remove from Cart' : 'Add to Cart'}
                </Button>

                  <Button
                    onClick={() => {
                      handleClickOpen();
                      setClickedProduct(item);
                    }}
                    size="small"
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            ))}
        </AnimatePresence>
      </Stack>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        sx={{
          width: "50%",
          height: "60%",
          margin: "auto",
          borderRadius: 10, 
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Close />
        </IconButton>

        <Box p={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {clickedProduct && (
              <Box>
                <Typography variant="h5">
                  {clickedProduct.attributes.productTitle}
                </Typography>
                <Typography
                  my={0.4}
                  fontSize={"22px"}
                  color={"crimson"}
                  variant="h6"
                >
                  ${clickedProduct.attributes.productPrise}
                </Typography>
                <Typography variant="body1">
                  {clickedProduct.attributes.productDescription}
                </Typography>

                <Stack direction={"row"} gap={1} my={2}>
                  {clickedProduct.attributes.productImg.data.map(
                    (item, index) => (
                      <img
                        key={item.id}
                        src={`http://localhost:1337${item.attributes.url}`}
                        alt=""
                        style={{
                          width: "130px",
                          height: "130px",
                          borderRadius: 3,
                          opacity: selectedImg === index ? 1 : 0.5,
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedImg(index)}
                      />
                    )
                  )}
                </Stack>

                <Button
                  onClick={handleCartOpen}
                  sx={{ mb: { xs: 1, sm: 0 }, textTransform: "capitalize" }}
                  variant="contained"
                >
                  <AddShoppingCartOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
                  Buy now
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
      <Dialog
  fullScreen
  open={cartOpen}
  onClose={handleClose}
  sx={{
    width: "50%",
    height: "90%",
    margin: "auto",
    borderRadius: 10, 
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  }}
>
  <IconButton
    onClick={handleClose}
    sx={{ position: "absolute", top: 8, right: 8 }}
  >
    <Close />
  </IconButton>

  <Box p={6}>
    <Box>
      <Typography variant="h5">Panier</Typography>
      <table  className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Image</th> {/* Ajouter une colonne pour les images */}
          </tr>
        </thead>
        <tbody>
          {/* Boucle pour afficher chaque produit */}
          {cartProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.attributes.productTitle}</td>
              <td>${product.attributes.productPrise}</td>
              <td>
                <img
                  src={`http://localhost:1337${product.attributes.productImg.data[0].attributes.url}`}
                  alt={product.attributes.productTitle}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              </td>
            </tr>
          ))}
          {/* Calcul de la somme des prix des produits sélectionnés */}
          <tr>
            <td   className="bg-warning" colSpan="2"   >Total Price:</td>
            <td>${cartProducts.reduce((total, product) => total + parseFloat(product.attributes.productPrise), 0)}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-warning">checkout</button>
    </Box>
  </Box>



</Dialog>



    </Container>
  );
};

export default Main;




