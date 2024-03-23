import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => {
    const [showImage, setShowImage] = useState(false);
    const [showModal, setShowModal] = useState(isOpen); // Додайте це для коректної ініціалізації модального вікна

    useEffect(() => {
        setShowModal(isOpen); // Поновлюємо showModal, якщо він змінюється зовні
    }, [isOpen]);

    const openModal = () => {
        if (!showModal) {
            setShowModal(true);
            setLargeImage(image);
        }
    };

    const closeModal = () => {
        if (showModal) {
            setShowModal(false);
            setLargeImage(null);
        }
    };

    useEffect(() => {
        if (isOpen) {
            const timeout = setTimeout(() => {
                setShowImage(true);
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={showModal} 
            onRequestClose={onRequestClose}
            contentLabel="Image Modal"
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <img src={image.urls.regular} alt={image.alt_description} className={styles.image} />
        </Modal>
    );
};

export default ImageModal;

