import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/header';
import iconFreeShipping from "../../assets/ic_shipping.png";

import axios from 'axios';
import './styles.scss';

export default function Result() {
  const [data, setData] = useState(null);
  const term = new URLSearchParams(useLocation().search).get('search');

  const formatPrice = (number, currency) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
    }).format(number);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/items?search=${term}`);
        setData(response.data.items);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, [term]);

  return (
    <div>
      <Header />
      <ul className="results">
        {data?.map(item => (
          <li key={item.id}>
            <Link className="itemProduct" to={item.id}>
              <img className="imgContent" src={item.picture_url} alt={item.title} />
              <div className="information">
                <span>{formatPrice(item.price.decimals, item.price.currency)} {' '}
                  {item.free_shiping && <img src={iconFreeShipping} width="18" height="18" alt="ìcone de frete grátis" />}</span>
                <p>{item.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
