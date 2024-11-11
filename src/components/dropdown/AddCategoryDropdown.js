import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 65;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categoryOptions = [
  '카테고리1',
  '카테고리2',
  '카테고리3',
  '카테고리4',
  '카테고리5',
  '카테고리6',
  '카테고리7',
  '카테고리8',
  '카테고리9',
  '카테고리10',
];

export default function AddCategory({ value = [], onChange }) {
  const theme = useTheme();

  const handleCheckChange = (event, field) => {
    if (event.target.checked) {
      onChange([...value, field]);
    } else {
      onChange(value.filter((item) => item !== field));
    }
  };

  const handleDelete = (field) => {
    onChange(value.filter((item) => item !== field));
  };

  return (
    <div>
      <StyledFormControl>
        <StyledSelect
          id="demo-multiple-chip"
          multiple
          displayEmpty
          value={Array.isArray(value) ? value : []}
          onChange={(event) => onChange(event.target.value)}
          input={<OutlinedInput id="demo-multiple-chip" />}
          renderValue={() => {
            if (value.length === 0) {
              return <em>최대 5개까지 선택 가능합니다</em>;
            }
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5,
                }}
              >
                {value.map((val) => (
                  <Chip key={val}>
                    {val}
                    <Icon
                      icon="ic:round-close"
                      style={{
                        width: '24px',
                        height: '24px',
                        color: 'white',
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation(); // Prevent the dropdown from opening
                        handleDelete(val);
                      }}
                    />
                  </Chip>
                ))}
              </Box>
            );
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <Title>내 카테고리</Title>
          {categoryOptions.map((field) => (
            <FormGroup
              key={field}
              style={{
                display: 'flex',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}
            >
              <MenuItem
                value={field}
                style={{
                  fontWeight: value.includes(field)
                    ? theme.typography.fontWeightMedium
                    : theme.typography.fontWeightRegular,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={value.includes(field)}
                        onChange={(event) => handleCheckChange(event, field)}
                      />
                    }
                  />
                  <div>{field}</div>
                </div>
              </MenuItem>
            </FormGroup>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </div>
  );
}

const Chip = styled.div`
  width: fit-content;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 0;
  border-radius: 5px;
  column-gap: 5px;
  background-color: #41c3ab;
  padding-left: 16px;
  padding-right: 16px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  margin: 24px 20px;
`;
const StyledFormControl = styled(FormControl)`
  && {
    margin: 0;
    width: 602px;
    height: fit-content;
    margin-top: 0;
    border-radius: 10px;
    border: 1px solid #9f9f9f;
    margin-left: 60px;
    margin-right: 20px;
    padding-top: -10px;
    padding-bottom: -10px;
  }
`;

const StyledSelect = styled(Select)`
  && {
    height: fit-content;
    display: flex;
    align-items: center;
  }
`;
