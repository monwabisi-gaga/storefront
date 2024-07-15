import React, { useState } from 'react';
import { Badge, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import CartDrawer from './CartDrawer';
import '../styles/FloatingCartButton.scss';

const FloatingCartButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="floating-cart-button">
      <Badge count={totalItems} size="default" status="success">
        <Button
          type="primary"
          shape="circle"
          icon={<ShoppingCartOutlined />}
          size="large"
          onClick={handleToggleDrawer}
        />
      </Badge>
      <CartDrawer open={open} onClose={handleToggleDrawer} />
    </div>
  );
};

export default FloatingCartButton;
