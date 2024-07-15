import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

interface SortProductsProps {
  selectedSort: 'asc' | 'desc';
  onSortChange: (sortOrder: 'asc' | 'desc') => void;
}

const SortProducts: React.FC<SortProductsProps> = ({
  selectedSort,
  onSortChange,
}) => {
  const { t } = useTranslation();
  return (
    <div className="sort-container">
      <Button.Group>
        <Button
          type={selectedSort === 'asc' ? 'primary' : 'default'}
          onClick={() => onSortChange('asc')}
        >
          {t('ascending')}
        </Button>
        <Button
          type={selectedSort === 'desc' ? 'primary' : 'default'}
          onClick={() => onSortChange('desc')}
        >
          {t('descending')}
        </Button>
      </Button.Group>
    </div>
  );
};

export default SortProducts;
