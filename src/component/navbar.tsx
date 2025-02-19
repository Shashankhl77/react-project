
import { AppBar, Toolbar, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" sx={{ top: 0, zIndex: 1100 }}>
      <Toolbar >
                <Button 
          color="inherit" 
          onClick={() => navigate('/')}
          sx={{ marginRight: 'auto'  }}
        >
          Home
        </Button>
        <Button 
          color="inherit" 
          onClick={() => navigate('/counter')}
          sx={{ marginRight: 'auto' }}
        >
          Counter
        </Button>
        
        <Button 
          color="inherit" 
          onClick={() => navigate('/user')}
          sx={{ marginRight: 'auto' }}
        >
          User Data
        </Button>
        <Button 
          color="inherit" 
          onClick={() => navigate('/editor')}
          sx={{ marginRight: 'auto' }}
        >
          RichText
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
