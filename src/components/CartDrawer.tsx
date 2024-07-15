import React, { useEffect } from 'react';
import { Drawer, List, Button, Image, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { removeFromCart } from '../state/store';
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    const createCartIfNotExists = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/carts/user/1`
        );
        if (!response.data.length) {
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/carts`, {
            userId: 1,
            date: new Date(),
            products: [],
          });
        }
      } catch (error) {
        message.error(t('failedCreatingCart'));
      }
    };

    createCartIfNotExists();
  }, []);

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const noDataText = <span>{t('cartIsEmpty')}</span>;

  return (
    <Drawer
      title={t('shoppingCart')}
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      width={400}
      footer={
        <div style={{ textAlign: 'right' }}>
          <span style={{ marginRight: 8 }}>
            {t('total', { total: totalPrice.toFixed(2) })}
          </span>
          <Button type="primary" onClick={onClose}>
            {t('checkout')}
          </Button>
        </div>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key={item.id}
                type="text"
                icon={<CloseOutlined />}
                onClick={() => handleRemoveFromCart(item.id)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Image src={item.image} width={64} />}
              title={item.title}
              description={
                t('price', { price: (item.price * item.quantity).toFixed(2) }) +
                ' ' +
                t('quantity', { quantity: item.quantity })
              }
            />
          </List.Item>
        )}
        locale={{ emptyText: noDataText }}
      />
    </Drawer>
  );
};

export default CartDrawer;
