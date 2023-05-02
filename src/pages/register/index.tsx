import * as React from 'react';
import { Button, Form, Input, message } from 'antd';
import styles from './index.module.less'
import Label from '@/components/common/common-label';
import { post } from '@/services/request';
import { useNavigate } from 'react-router-dom';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const Register: React.FC = () => {
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    post('/user/register', values).then((res) => {
      if (res.code === 0) {
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      } else {
        message.error(res.msg)
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
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<Label className={styles.text}><b>邮箱(非必填)</b></Label>}
              name="email"
              required={false}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<Label className={styles.text}><b>密码</b></Label>}
              name="password"
              required={false}
              rules={[{ required: true, message: '请设置密码' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={<Label className={styles.text}><b>再次输入密码</b></Label>}
              name="repassword"
              required={false}
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: '请再次输入密码',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次密码输入不一致'));
                  },
                }),
              ]}
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
