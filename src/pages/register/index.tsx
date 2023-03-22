import * as React from 'react';
import { Button, Form, Input } from 'antd';
import styles from './index.module.less'
import Label from '@/components/common/common-label';
import { post } from '@/services/request';
import { useNavigate } from 'react-router-dom';
import alertNotification from '@/components/common/notification';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const Register: React.FC = () => {
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Success:', values);
    post('/user/register', values).then((res) => {
      if (res?.code === 0) {
        alertNotification('提示', '注册成功')
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      }
    })
  };
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.background}>
        </div>
        <div className={styles.right}>
          <div className={styles.title}><h1><b><i>welcome!</i></b></h1>
          </div>
          <Form
            name="basic"
            colon={false}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles.form}
          >
            <Form.Item
              label={<Label className={styles.text}><b>用户名</b></Label>}
              name="username"
              required={false}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<Label className={styles.text}><b>邮箱</b></Label>}
              name="email"
              required={false}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<Label className={styles.text}><b>密码</b></Label>}
              name="password"
              required={false}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={<Label className={styles.text}><b>再次输入密码</b></Label>}
              name="repassword"
              required={false}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>



            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>

      </div>

    </div>

  )
}

export default Register;
