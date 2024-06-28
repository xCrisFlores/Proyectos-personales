import React, { useState, useEffect } from 'react';
import { useProductContext } from '../ProductContext';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import filterImage from '../assets/filter_icon.png';
import Typography from '@mui/material/Typography';

function DashboardGuest() {
  const { products } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [priceRange, setPriceRange] = useState([0, 1500]); 
  const [minPrice, setMinPrice] = useState(0);
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [priceRange]);

  useEffect(() => {
    if (showSlider) {
      filterProductsByPrice();
    } else {
      setFilteredProducts([...products]);
    }
  }, [minPrice, maxPrice, showSlider, products]);

  const filterProductsByPrice = () => {
    setFilteredProducts(
      products.filter(product => product.price >= minPrice && product.price <= maxPrice)
    );
  };

  const filterProductsBySearch = () => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  useEffect(() => {
    if (search.trim() === '') {
      filterProductsByPrice();
    } else {
      filterProductsBySearch();
    }
  }, [search]);

  return (
    <div style={{ marginBottom: '500px' }}>
      <div className='title_div'>
        <p style={{ fontFamily: 'helvetica', fontSize: '3em' }}>Dashboard</p>
      </div>

      {showSlider && (
        <div className='filter_container'>
          <Typography id="range-slider" gutterBottom>
            Rango de Precio
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1500}
            step={5}
          />
          <div>
            <p className='primary_lbl'>Buscar</p>
            <input
              className='search_inp'
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="tasks-container">
        {filteredProducts.map(product => (
          <div key={product.id} className="task">
            <p className='task_title'>{product.title}</p>
            <p className='primary_lbl'>{product.description}</p>
            <p className='primary_lbl'>Price: ${product.price}</p>
            <img src={product.images[0]} alt={product.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </div>
        ))}
      </div>

      <div className='new_container'>
        <div className='buttons_wrapper'>
            <button className='button_container' onClick={toggleSlider}>
              <img src={filterImage} alt="filtrar" className='button_icon'/>
            </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardGuest;
