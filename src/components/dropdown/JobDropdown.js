import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';

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

export default function SingleSelectPlaceholder({ value, onChange }) {
  const theme = useTheme();
  const jobOptions = [
    '직장인',
    '프리랜서',
    '학생',
    '무직',
    '아르바이트',
    '기타(직접 입력)',
  ];

  return (
    <div>
      <StyledFormControl>
        <StyledSelect
          displayEmpty
          value={value} // Controller에서 전달된 value 사용
          onChange={(event) => onChange(event.target.value)} // Controller의 onChange 사용
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (!selected) {
              return <em>직업을 선택하세요.</em>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {jobOptions.map((job) => (
            <MenuItem
              key={job}
              value={job}
              style={{
                fontWeight:
                  value === job
                    ? theme.typography.fontWeightMedium
                    : theme.typography.fontWeightRegular,
              }}
            >
              {job}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </div>
  );
}

// Styled Components for overriding styles
const StyledFormControl = styled(FormControl)`
  && {
    margin: 0;
    width: 445px;
    height: 65px;
    margin-top: 0;
    border-radius: 5px;
    border: 1px solid #9f9f9f;
  }
`;

const StyledSelect = styled(Select)`
  && {
    height: 65px;
    display: flex;
    align-items: center;
  }
`;
