import * as React from 'react';
import { Divider, Layout, Menu, Popover, theme } from 'antd';
import {
  NavLink,
  useRoutes
} from "react-router-dom";
import { router } from '@/router';
import { minHeight, menu } from './config';
import styles from './index.module.less'

const { Header, Content, Footer } = Layout;

type IProps = any

const App: React.FC<IProps> = () => {
  const routeElement = useRoutes(router)
  const [selectedKey, setSelectedKey] = React.useState<string>('')

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userInfo = {
    username: '红茶很好喝'
  }

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['']}
          selectedKeys={[selectedKey]}
          items={menu.map((item) => {
            return {
              key: item.path,
              label: <NavLink
                onClick={() => setSelectedKey(String(item.path))}
                to={item.path}>{item.name}</NavLink>,
            };
          })}
        />
        <div className={styles.divider}></div>
        <Popover arrowPointAtCenter overlayClassName={styles.user} placement="bottom" title={userInfo.username} content={<div>粉丝：99</div>}>
          <div className={styles.userInfo}>
            {userInfo.username}
          </div> </Popover>
      </Header>
      <Content style={{ padding: '0 50px', minHeight: minHeight }}>
        <div className={styles.siteLayoutContent} style={{ background: colorBgContainer }}>
          {routeElement}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Blog ©2023 Created by Star</Footer>
    </Layout >
  );
};

export default App;
