import React from 'react';
import { Result, Button } from 'antd';
import { useTranslation } from 'react-i18next';

interface ErrorResultProps {
  title: string;
  subTitle: string;
  status: '403' | '404' | '500';
}

const ErrorResult: React.FC<ErrorResultProps> = ({
  title,
  subTitle,
  status,
}) => {
  const { t } = useTranslation();
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        <Button type="link" href="/">
          {t('backToHome')}
        </Button>
      }
    />
  );
};

export default ErrorResult;
