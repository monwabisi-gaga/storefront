import React from 'react';
import '../styles/Modal.scss';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  title: string;
  description: string;
  price: number;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  price,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-description">{description}</p>
        <p className="modal-price">${price}</p>
        <button className="modal-close-btn" onClick={onClose}>
          {t('close')}
        </button>
      </div>
    </div>
  );
};

export default Modal;
