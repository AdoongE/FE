import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import { axiosInstance } from '../api/axios-instance';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { font } from '../../styles/font';

const ITEM_HEIGHT = 65;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '452px',
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

  const handleViewCategory = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/category');
      const results = response.data.results;
      const names = results.map((item) => item.name);
      setCategories(names);

      console.log('카테고리 조회 성공');
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
              return <>최대 5개까지 선택 가능합니다</>;
            }
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.026vw',
                }}
              >
                {value.map((val) => (
                  <Chip key={val}>
                    {val}
                    <CancelIcon
                      icon="ic:round-close"
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
          <Title disabled>내 카테고리</Title>
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 0;
  border-radius: 4px;
  background-color: var(--green2);
  padding: 6.5px 12px;
  gap: 4px;
  margin-right: 12px;
`;

const CancelIcon = styled(Icon)`
  width: 18px;
  height: 18px;
  color: white;
`;

const Title = styled.div`
  ${font.title3}
  margin: 12px 16px;
`;

const StyledFormControl = styled(FormControl)`
  && {
    margin: 0;
    width: 452px;
    height: fit-content;
    border-radius: 8px;
    border: 0.6px solid var(--gray2);
    margin-left: 59px;
    margin-right: 12px;
  }
`;

const StyledSelect = styled(Select)`
  && {
    height: 48px;
    display: flex;
    align-items: center;
    ${font.title4}
    color: var(--gray2);
  }
`;
