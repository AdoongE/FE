import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export const PublicToggle = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: '42px',
  height: '24px',
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 3,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#41C3AB',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: '18px',
    height: '18px',
  },
  '& .MuiSwitch-track': {
    borderRadius: 20,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

export default function CustomizedSwitches() {
  return (
    <FormGroup>
      <FormControlLabel
        control={<PublicToggle sx={{ m: 1 }} defaultChecked />}
        label="iOS style"
      />
    </FormGroup>
  );
}
