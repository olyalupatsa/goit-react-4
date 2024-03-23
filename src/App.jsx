// src/App.jsx
import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages } from './api/unsplash';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  const handleSearchSubmit = async (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
    setIsLoading(true);

    try {
      const data = await fetchImages(query, 1);
      setImages(data.results);
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const data = await fetchImages(searchQuery, currentPage + 1);
      setImages((prevImages) => [...prevImages, ...data.results]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (image) => {
    setShowModal(true);
    setLargeImage(image);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {showModal && (
  <ImageModal isOpen={showModal} onRequestClose={closeModal} image={largeImage} />
)}
    </div>
  );
};

export default App;