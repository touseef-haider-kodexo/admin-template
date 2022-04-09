import styled from "styled-components";

export const Paginate = styled.div`
  padding: 16px;
  justify-content: flex-end;

  .pag {
    border: none;
    padding: 0;
    outline-style: none;
    background-color: rgba(0, 0, 0, 0);
  }
  .pag img {
    width: 25px;
    height: 25px;
  }
  .MuiIconButton-root {
    padding: 0 5px;
  }
  .paging {
  }
  .mr {
    margin-right: 8px;
  }
  .page-link {
    height: 25px;
    width: 25px;
    border-radius: 6px;
  }
  .active-number {
    background-color: ${({ theme }) => theme.colors.deepblue};
    color: ${({ theme }) => theme.colors.white};
    outline: none;
    border: none;
    margin: 0 5px;
  }
`;
export const Notifications = styled.div`
  margin-top: 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 20px;

  .profile-logo-container {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px ${({ theme }) => theme.colors.gray5};
    border-radius: 22px;
    margin-right: 26px;
  }

  .mouse-cursor {
    cursor: pointer;
  }
  .profile-logo {
    object-fit: contain;
    border-radius: 22px;
  }
  .paginating {
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media screen and (max-width: 1024px) {
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
  .pl20 {
    padding-left: 20px;
  }

  .updated {
    border-left: 2px solid none;
  }
  .process {
    border-left: 2px solid none;
  }
  .complete {
    border-left: 4px solid ${({ theme }) => theme.colors.deepblue};
  }
  .MuiTablePagination-caption {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-family: "Poppins-Light";
    color: ${({ theme }) => theme.colors.black2};
  }
  .MuiTablePagination-input {
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    border-radius: 11px;
    padding: 0 5px;
  }
  .MuiTablePagination-root:last-child {
    width: 100%;
  }
  .MuiTablePagination-spacer {
    display: none;
  }
  .MuiTablePagination-toolbar {
    justify-content: start;
    flex-wrap: wrap;
    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
      justify-content: center;
    }
  }

  .MuiTablePagination-actions {
    display: none;
  }

  .icon {
    color: ${({ theme }) => theme.colors.blue1};
    font-weight: bolder;
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
  .oval {
    border-radius: 50%;
    min-width: 40px;
    justify-content: center;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.blue2};
    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
      margin-right: 10px;
    }
  }
  .mr-30 {
    margin-right: 30px;
  }
  .MuiTableRow-root {
    display: flex;
    padding: 8px 15px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
  }
  .MuiTableCell-root {
    border-bottom: none;
  }
  .action {
    color: ${({ theme }) => theme.colors.black2};
    margin-bottom: 5px;
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
  .name {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.gray4};
    line-height: 10px;
  }

  .duration {
    text-align: end;
  }

  .showing,
  .duration {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

export const RecentActivity = styled.div`
  margin-top: 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 20px;
  .duration,
  .who {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray4};
  }

  .mouse-cursor {
    cursor: pointer;
  }

  .paginating {
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media screen and (max-width: 1024px) {
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
  .MuiTablePagination-caption {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-family: "Poppins-Light";
    color: ${({ theme }) => theme.colors.black2};
  }
  .MuiTablePagination-input {
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    border-radius: 11px;
    padding: 0 5px;
  }
  .MuiTablePagination-root:last-child {
    width: 100%;
  }
  .MuiTablePagination-spacer {
    display: none;
  }
  .MuiTablePagination-toolbar {
    justify-content: start;
    flex-wrap: wrap;
    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
      justify-content: center;
    }
  }

  .MuiTablePagination-actions {
    display: none;
  }
  .duration {
    text-align: end;
  }
  .mr-30 {
    margin-right: 30px;
  }
  .MuiTableRow-root {
    display: flex;
    padding: 8px 15px 8px 1px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
  }
  .MuiTableCell-root {
    border-bottom: none;
  }
  .icon {
    color: ${({ theme }) => theme.colors.link};
    font-weight: bolder;
    margin-right: 30px;
    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
      margin-right: 5px;
    }
  }

  .text {
    padding-left: 50px;
  }

  .updated {
    border-left: 2px solid none;
  }
  .process {
    border-left: 2px solid none;
  }
  .complete {
    border-left: 4px solid ${({ theme }) => theme.colors.deepblue};
  }

  .what {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
  .showing {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray4};
  }
`;
