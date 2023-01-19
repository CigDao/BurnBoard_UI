import { Button, MenuItem, Typography, Menu, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';

export default function NavMenu(param: {appName: string}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [options, setOptions] = useState<Map<string, string>>(new Map())
    const [loading, setLoading] = useState<boolean>(true)

    const open = Boolean(anchorEl);

    useEffect(()=>{
    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", "Oho73uqS5l3omAuUSo4gN6UfuJGkpFfh6ilsZwrC");

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    getApps(requestOptions).then();
    },[]);

    async function getApps(requestOptions: RequestInit){
        const response = await fetch("https://jrpiogb87d.execute-api.us-east-1.amazonaws.com/default/getHostNameCanisterMap", requestOptions);
        const responseJson = await response.json();
        const menuItems = new Map<string, string>();
        responseJson.forEach((el: any) => {
            const hostName = el.hostName[0];
            if (hostName.includes("cigdao.org")) {
                menuItems.set(hostName, el.niceName)
            }
        });
        setOptions(menuItems);
        setLoading(false);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRoute = (url: string) => {
        window.location.href = `http://${url}`;
    }
    
	return (<>
        <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            disabled={loading}
        >
        <Typography variant='h6' sx={{ my: 2, color: theme => theme.palette.primary.contrastText }}>
            {param.appName} 
        </Typography>
        <Box sx={{color: theme => theme.palette.primary.contrastText }}><ExpandMoreIcon/></Box>
        
        </Button>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
            {
            Array.from(options.keys()).filter(x => !window.location.href.includes(x)).map((key) => {
                const niceName = options.get(key??"");
                return <MenuItem key={key} onClick={() => handleRoute(key)}>{niceName}</MenuItem>
            })
            }
        </Menu>
    </>

	);
}
