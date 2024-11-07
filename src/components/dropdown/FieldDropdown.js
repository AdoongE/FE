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

const fieldOptions = [
  'CEO/사업',
  '기획/전략',
  '마케팅/광고/홍보',
  '회계/세무/재무',
  '인사/HR',
  '총무/법무/사무',
  'IT 개발/데이터',
  '디자인',
  '영업/무역',
  '생산/물류/자재',
  '상품기획/MD',
  '건설/건축',
  '의료',
  'R&D/연구',
  '교육',
  '금융/보험',
  '공공/복지',
  '기타(직접 입력)',
];

export default function FieldSelectPlaceholder({ value, onChange }) {
  const theme = useTheme();

  return (
    <div>
      <StyledFormControl>
        <StyledSelect
          displayEmpty
          value={value}
          onChange={(event) => onChange(event.target.value)}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (!selected) {
              return <em>분야를 선택하세요.</em>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {fieldOptions.map((field) => (
            <MenuItem
              key={field}
              value={field}
              style={{
                fontWeight:
                  value === field
                    ? theme.typography.fontWeightMedium
                    : theme.typography.fontWeightRegular,
              }}
            >
              {field}
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
