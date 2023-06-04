import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Brightness5Icon from '@mui/icons-material/Brightness5';
export const mainListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      View
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Summary" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Brightness2Icon />
      </ListItemIcon>
      <ListItemText primary="月別" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Brightness5Icon />
      </ListItemIcon>
      <ListItemText primary="日別" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Registration
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="収入登録" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="支出登録" />
    </ListItemButton>
  </React.Fragment>
);