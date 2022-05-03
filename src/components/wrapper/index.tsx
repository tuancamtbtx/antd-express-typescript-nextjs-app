import styled from 'styled-components'

export const ContentWrapper = styled.div`
  box-shadow: 0px 1px 3px rgba(194, 194, 194, 0.2);
  background-color: #fff;
  border-radius: 8px;
  margin: 12px;
  .ant-table-wrapper {
    margin: 16px;
  }
  .ant-table-pagination.ant-pagination {
    display: flex;
    justify-content: center;
    float: inherit;
  }
`

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  h1 {
    margin-bottom: 0px;
    font-size: 18px;
    font-weight: 700;
  }
`

export const LayoutWrapper = styled.div`
  .nav-text {
    color: #ecf0f1;
    font-weight: 500;
  }
  .ant-menu-inline {
    border-right: 0px;
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: black;
    color: white;
    font-weight: 700;
  }
  .ant-menu-item-group-title  {
    color: white;
    font-weight: 600;
    font-size: 14px;
    padding-top: 1px!important;
  }
  #headerNav {
    margin-top: -1px;
    padding: 0px 12px;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #001529;
    box-shadow: 0 1px 3px rgba(18,18,18,.1);
    .ant-menu-horizontal {
      border-bottom: 0px;
    }
  }
  .ant-menu-item {
    margin-top: -8px;
    padding: -2px;
    font-weight: 500;
    font-size: 14px;
  }
  .anticon {
    color: white;
    font-size: 12px;
  }
  .fullname {
    color: #000;
    font-weight: 600;
  }
`
export const LogoWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    img {
      max-width: 40px;
      max-height: 40px;
    }
`
