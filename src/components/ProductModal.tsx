import React from 'react';
import { Modal, Button } from 'antd';
import { Product } from '../types';
import { useTranslation } from 'react-i18next';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  product,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      title={product.title}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p>{t('price', { price: product.price })}</p>
      <p>{t('description')}: {product.description}</p>
    </Modal>
  );
};

export default ProductModal;
