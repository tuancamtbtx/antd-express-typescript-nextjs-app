import styled from 'styled-components'

export const ContentWrapper = styled.div`
  box-shadow: 0px 1px 3px rgba(194, 194, 194, 0.2);
  background-color: #fff;
  border-radius: 4px;
  margin: 16px;
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
    color: black;
  }
  .ant-menu-inline {
    border-right: 0px;
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #f1ecf2ab;
    color: red;
  }
  .ant-layout-sider {
  }
  .ant-menu-item-group-title  {
    color: #000;
    font-weight: 700;
    font-size: 16px;
    padding-top: 24px!important;
  }
  #headerNav {
    padding: 0px 16px;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(18,18,18,.1);
    .ant-menu-horizontal {
      border-bottom: 0px;
    }
  }
  .ant-menu-item {
    font-weight: 700;
  }
  .anticon {
    color: #2c3e50;
    font-size: 16px;
  }
  .fullname {
    color: #000;
    font-weight: 600;
  }
`
export const LogoWrapper = styled.div`
    img {
      width: 72px;
      height: 36px;
     margin: 16px 28px 16px 0;
     float: left;
    }
  
`
