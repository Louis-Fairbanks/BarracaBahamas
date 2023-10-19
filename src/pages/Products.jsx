import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/Products.css'
import { products } from "../assets/products";
import Cardlist from "../components/Cardlist";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([])
  // Get the searchTerm from the URL params
  const { searchTerm } = useParams();

  // Filter the products based on the searchTerm
  const [filteredProducts, setFilteredProducts] = useState(
    filterResults(
      searchTerm
        ? products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : products
    )
  );

  useEffect(() => {
    // Update filteredProducts whenever the searchTerm changes
    setFilteredProducts(filterResults(searchTerm ? products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())) : products));
  }, [searchTerm]);


  function filterResults(arr) {
    if(filters.length === 0){
      return arr
    } else{
      if(filters.includes('peso')){
        arr = arr.slice().sort((a,b) => a.weight - b.weight)
      }
      if(filters.includes('stock')){
        arr = arr.slice().sort((a,b) => a.stock - b.stock)
      }
      if(filters.includes('precio')){
        arr = arr.slice().sort((a, b) => a.price - b.price)
      }
      if(filters.includes('plomeria')){
        arr = arr.filter((product) => product.category === 'Plomeria')
      }
      if(filters.includes('pinturas')){
        arr = arr.filter((product) => product.category === 'Pinturas')
      }
      if(filters.includes('maderas')){
        arr = arr.filter((product) => product.category === 'Maderas')
      }
      if(filters.includes('herramientas')){
        arr = arr.filter((product) => product.category === 'Herramientas')
      }
      if(filters.includes('otros')){
        arr = arr.filter((product) => product.category === 'Otros')
      }
    }
    return arr;
  }
  //useEffect to sort items on every filter change
  useEffect(() => {
    setFilteredProducts(filterResults(filteredProducts))
  }, [filters])

  const handleFilterChange = (e) => {
        const filterString = filters.toString()
        let navigationString;
        if(!filterString.includes(e.target.id)){
        setFilters([...filters, e.target.id])
        if(filters.length === 0){
            navigationString = '?filtros=' + e.target.id
        }
        else{navigationString = '?filtros=' + filterString + ',' + e.target.id}
      }
      else{
        const removedFilters = filters.filter((string) => (string != e.target.id))
        setFilters(removedFilters)
        if(removedFilters.length == 0){
          navigate('/productos')
        }else{
          navigationString = '?filtros=' + removedFilters.toString()
        }
      }
      navigate(navigationString)
  }

  

  return (
    <>
      <Header filters={filters.length > 0 ? filters : null} />
      <div className="products-page">
        <div className="main-products">
          <div className="sidebar">
          <div>
            <h4>Ordenar por</h4>
            <div>
              <input type="checkbox" id="precio" onChange={handleFilterChange}/>
              <label htmlFor="precio">Precio</label>
            </div>
            <div>
              <input type="checkbox" id="peso" onChange={handleFilterChange}/>
              <label htmlFor="peso">Peso</label>
            </div>
            <div>
              <input type="checkbox" id="stock" onChange={handleFilterChange}/>
              <label htmlFor="stock">Stock</label>
            </div>
            </div>
            <div>
            <h4>Buscar por categoría</h4>
            <div>
              <input type="checkbox" id="plomeria" onChange={handleFilterChange}/>
              <label htmlFor="plomeria">Plomería</label>
            </div>
            <div>
              <input type="checkbox" id="pinturas" onChange={handleFilterChange}/>
              <label htmlFor="pinturas">Pinturas</label>
            </div>
            <div>
              <input type="checkbox" id="maderas" onChange={handleFilterChange}/>
              <label htmlFor="maderas">Maderas</label>
            </div>
            <div>
              <input type="checkbox" id="herramientas" onChange={handleFilterChange}/>
              <label htmlFor="herramientas">Herramientas</label>
            </div>
            <div>
              <input type="checkbox" id="otros" onChange={handleFilterChange}/>
              <label htmlFor="otros">Otros</label>
            </div>
            </div>
          </div>
          <div className="cardlist-container">
            <Cardlist cards={filteredProducts} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;