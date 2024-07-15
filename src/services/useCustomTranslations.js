import { useTranslation } from 'react-i18next';

const useCustomTranslations = () => {
  const { t } = useTranslation();
  return { t };
};

export default useCustomTranslations;

