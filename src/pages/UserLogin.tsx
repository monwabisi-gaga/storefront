import React, { useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { loginUser } from '../state/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import '../styles/UserLogin.scss';
import { AppDispatch } from '../state/store';
import { useTranslation } from 'react-i18next';

const UserLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const actionResult = await dispatch(loginUser(values));
      const resultAction = unwrapResult(actionResult);
      if (resultAction) {
        message.success(t('loginSuccess'));
        navigate('/');
      } else {
        message.error(t('loginFail'));
      }
    } catch (error) {
      message.error(t('loginFail'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card title="Login" className="login-card">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: t('inputYourUsername') }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t('inputYourPassword') }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t('login')}
            </Button>
          </Form.Item>

          <Form.Item>
            {t('dontHaveAnAccount')}{' '}
            <Button type="link" href="/register">
              {t('register')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserLogin;
