import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import { registerUser } from '../services/api';
import '../styles/UserRegistration.scss';
import { useTranslation } from 'react-i18next';

const UserRegistration: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onFinish = async (values: {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error(t('passwordDoNotMatch'));
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        username: values.username,
        password: values.password,
        email: values.email,
      });
      navigate('/login');
    } catch (error: unknown) {
      message.error(t('failedToRegister'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-registration-container">
      <Card title="Register" className="register-card">
        <Form
          name="register"
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
            name="email"
            rules={[
              { required: true, message: t('inputYourEmail') },
              { type: 'email', message: t('inputYourEmail') },
            ]}
          >
            <Input placeholder={t('email')} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t('inputYourPassword') }]}
            hasFeedback
          >
            <Input.Password placeholder={t('password')} />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: t('confirmYourPassword') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('passwordsDoNotMatch')));
                },
              }),
            ]}
          >
            <Input.Password placeholder={t('confirmYourPassword')} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t('register')}
            </Button>
          </Form.Item>

          <Form.Item>
            {t('alreadyHaveAnAccount')}&nbsp;<Link to="/login">{t('login')}</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserRegistration;
