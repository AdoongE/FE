import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: ${(props) =>
    props.isVisible ? 'block' : 'none'}; /* ✅ 기본적으로 숨김 */
  background: var(--gray4);
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  transition: all 0.3s ease-in-out;
`;
