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
            <Link className="linkHome" to={item.id}>
              <img src={iconFreeShipping} alt="Logo do mercado livre" />
            </Link>
            <img className="imgContent" src={item.picture_url} alt={item.title} />
            <div className="information">
              <span>{formatPrice(item.price.decimals, item.price.currency)} {' '}
                {item.free_shiping && <img src={iconFreeShipping} width="18" height="18" alt="ìcone de frete grátis" />}</span>
              <p>{item.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


// {
//   "id": "MLB4595443686",
//   "title": "Bolsa Plyo Unissex Reebok Acambamento Dos Ferragens Níquel Cor Preto Correia De Ombro Preto Desenho Do Tecido Liso",
//   "price": {
//       "currency": "BRL",
//       "amount": 1,
//       "decimals": 141.99
//   },
//   "picture_url": "http://http2.mlstatic.com/D_689440-MLU75112068941_032024-I.jpg",
//   "condition": "new",
//   "free_shiping": true
// }