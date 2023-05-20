import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN';
import App from '@/layout'
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'antd/dist/reset.css';

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
};

const defaultData: ThemeData = {
  borderRadius: 6,
  colorPrimary: '#000',
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: defaultData.colorPrimary, borderRadius: defaultData.borderRadius } }} locale={zhCN}>
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
