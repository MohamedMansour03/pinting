import React, { useState } from 'react';
import {
  Badge,
  Container,
  IconButton,
  InputBase,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
  useTheme
} from "@mui/material";
import { ExpandMore, ShoppingCartOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import { NavLink } from 'react-router-dom'; // Importation de NavLink

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto", 
}));


const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #777",
  padding: theme.spacing(1, 1, 1, 4),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "330px",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const options = ["All Categories", "CAR", "Clothes", "Electronics"];

const Header2 = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
      <Stack >
      <img width={"85%"} src="./images/DX.jpg" alt="" />

      </Stack>

      <Search
       sx={{
        display: "flex",
        mp: 6,
        mx: 30,
        borderRadius: "50px",
        justifyContent: "space-between",
      
      }}
      
      
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          sx={{
            marginLeft: theme.spacing(1)
          
            
          }}
          
            
        />

        <List
          component="nav"
          aria-label="Device settings"
          sx={{
            bgcolor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            borderBottomRightRadius: 22,
            borderTopRightRadius: 22,
            marginLeft: theme.spacing(1),
             p: "0",
          }}
        >
          <ListItem
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              sx={{
                width: 90,
                textAlign: "center",
                "&:hover": { cursor: "pointer" },
              }}
              secondary={options[selectedIndex]}
            />
            <ExpandMore sx={{ fontSize: "7px" }} />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              sx={{ fontSize: "13px" }}
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Search>

      <Stack direction={"row"} alignItems={"center"}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="primary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>

        <IconButton>
          <Person2OutlinedIcon />
        </IconButton>
      </Stack>
    </Container>
  );
};

export default Header2;

