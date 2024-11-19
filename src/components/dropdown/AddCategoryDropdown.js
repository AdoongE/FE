import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import axios from 'axios';

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

export default function AddCategory({ value = [], onChange }) {
  const [categories, setCategories] = useState([]);
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

  const token = localStorage.getItem('jwtToken');
  const api = axios.create({
    baseURL: 'http://52.78.221.255',
    headers: { Authorization: `${token}` },
  });

  const handleViewCategory = async () => {
    try {
      const response = await api.get('/api/v1/category');
      const results = response.data.results;
      console.log('카테고리 이름 좀 보자', results);
      const names = results.map((item) => item.name);
      setCategories(names);

      if (response.status === 200) {
        console.log('카테고리 조회 성공');
      } else {
        console.error('카테고리 조회 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
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
          onOpen={handleViewCategory}
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
                        e.stopPropagation();
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
          {categories.map((field) => (
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
    width: 709px;
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
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #9f9f9f;
  }
`;
