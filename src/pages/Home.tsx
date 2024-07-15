import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  AppDispatch,
  fetchCategories,
  fetchProductsByCategory,
  setError,
  fetchAllProducts,
  fetchProductsSorted,
  setLoading,
  setProducts,
} from '../state/store';
import { logoutUser } from '../state/auth/authSlice';
import { Row, Spin, Layout, Menu, Select, Button } from 'antd';
import '../styles/home.scss';
import FloatingCartButton from '../components/FloatingCartButton';
import SortProducts from '../components/SortProducts';
import ErrorResult from '../components/ErrorResult';
import { Product } from '../types';
import { useTranslation } from 'react-i18next';

const HomeProductCard = lazy(() => import('../components/HomeProductCard'));
const ProductModal = lazy(() => import('../components/ProductModal'));

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const {
    items: products,
    categories,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleCategoryChange = useCallback(
    async (selectedCategories: string[]) => {
      try {
        dispatch(setLoading(true));

        if (selectedCategories.length === 0) {
          await dispatch(fetchAllProducts());
        } else {
          dispatch(setProducts([]));

          for (const category of selectedCategories) {
            await dispatch(fetchProductsByCategory(category));
          }
        }
      } catch (error) {
        dispatch(setError(t('failToLoadCategory')));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
    setSelectedProduct(null);
  }, []);

  const handleSortChange = useCallback(
    async (sortOrder: 'asc' | 'desc') => {
      try {
        await dispatch(fetchProductsSorted(sortOrder));
        setSelectedSort(sortOrder);
      } catch (error) {
        dispatch(setError(t('failToLoadProducts')));
      }
    },
    [dispatch]
  );

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Layout>
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          className="menu"
        >
          <Menu.Item key="profile">
            <Button type="link" href="/profile">
              {t('profile')}
            </Button>
          </Menu.Item>
          <Menu.Item key="logout">
            <Button type="link" onClick={handleLogout}>
              {t('logout')}
            </Button>
          </Menu.Item>
        </Menu>
        <Select
          mode="multiple"
          allowClear
          placeholder="Filter by categories"
          className="category-select"
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Header>
      <Content className="content">
        <div className="content-inner">
          {error && (
            <ErrorResult subTitle={error} title={t('error')} status="500" />
          )}
          <SortProducts
            selectedSort={selectedSort}
            onSortChange={handleSortChange}
          />
          <div className="home-container">
            {loading ? (
              <Spin size="large" className="loading-spinner" />
            ) : (
              <Row gutter={[16, 16]}>
                {products.map((product) => (
                  <Suspense key={product.id} fallback={<Spin />}>
                    <HomeProductCard
                      product={product}
                      onClick={() => handleProductClick(product)}
                    />
                  </Suspense>
                ))}
              </Row>
            )}
          </div>
          {selectedProduct && (
            <Suspense fallback={<Spin />}>
              <ProductModal
                open={modalVisible}
                onClose={handleModalClose}
                product={selectedProduct}
              />
            </Suspense>
          )}
          <FloatingCartButton />
        </div>
      </Content>
      <Footer className="footer">
        {t('shop.it', { year: new Date().getFullYear() })}
      </Footer>
    </Layout>
  );
};

export default Home;
