import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToUserCart } from '../state/cart/cartActions';
import { AppDispatch } from '../state/store';
import { Product } from '../types';
import { Card, Col, Popover, Button, InputNumber } from 'antd';
import { ShoppingCartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import '../styles/HomeProductCard.scss';

interface HomeProductCardProps {
  product: Product;
  onClick: () => void;
}

const HomeProductCard: React.FC<HomeProductCardProps> = ({
  product,
  onClick,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState<number>(1);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);

  const handleQuantityChange = (value: number | undefined | null) => {
    if (value !== undefined && value !== null) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    await dispatch(addToUserCart(product, quantity));
    setPopoverVisible(false);
  };

  const content = (
    <div>
      <InputNumber min={1} value={quantity} onChange={handleQuantityChange} />
      <Button
        type="primary"
        onClick={handleAddToCart}
        icon={<ShoppingCartOutlined />}
      >
        Add to Cart
      </Button>
    </div>
  );

  return (
    <Col span={4} key={product.id}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={product.title} src={product.image} />}
        actions={[
          <Popover
            content={content}
            title="Select Quantity"
            key={product.id}
            open={popoverVisible}
            onOpenChange={setPopoverVisible}
          >
            <ShoppingCartOutlined key="add" />
          </Popover>,
          <InfoCircleOutlined key="info" onClick={onClick} />,
        ]}
      >
        <Card.Meta title={`$${product.price}`} description={product.title} />
      </Card>
    </Col>
  );
};

export default HomeProductCard;
