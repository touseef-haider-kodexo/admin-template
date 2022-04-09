import styled from "styled-components";

export const DropDownContainer = styled.div`
  .input_label {
    margin-bottom: 5px;
    margin-top: 0;
    letter-spacing: 0.1px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray2};
  }
  .search-text {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme }) => theme.colors.gray2};
  }
`;
