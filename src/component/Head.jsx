import { useState } from 'react'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './Head/SearchBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';


// export let URLLink = "https://app.spiritx.co.nz/api/"
// export let picturesURL = "https://app.spiritx.co.nz/storage/"
// export let localAPI = false;

export default function SearchAppBar({filterItems}) {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.clear("token")
    //window.location.reload()
    navigate("../")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <SearchBar filterItems={filterItems} />
          <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}></Typography>
          <Button color="inherit" onClick={logOut}>LogOut</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
