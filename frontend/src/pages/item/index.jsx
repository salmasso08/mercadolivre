import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header';
import axios from 'axios';
import './styles.scss'

export default function Items() {
  const [data, setData] = useState(null);
  const id = useLocation().pathname.replace("/items/", "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/items/${id}`);
        setData(response?.data?.item);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    
    fetchData();
  }, [id]);

  if(data === null) {
    return <>Loading...</>
  }

  const formatPrice = (number, currency) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
    }).format(number);
  }

  const replaceDescription = (description) => {
    if (description) {
      const descriptionFormat = description.split('\n')
      return descriptionFormat.map((linha, index) => (
        <p key={index}>{linha}</p>
      ))
    }
  }

  function breadcrumb(crumb) {
    const crumbs = crumb.join(" > ");
    return crumbs
  }

  return (
    <section>
      <Header />
      <span className="crumbs">{breadcrumb(data?.path)}</span>
      <div className="item">
        <div className="description">
          <img src={data?.picture_url} alt={data?.title} />

          <h2>Descrição do produto</h2>
          {replaceDescription(data?.description)}
        </div>
        <div className="contentProduct">
          {data?.condition ? <p className="condition">Novo</p> : ''}
          <p className="titleProduct">{data?.title}</p>
          <p className="priceProduct">{formatPrice(data?.price?.decimals, data?.price?.currency)}</p>
          <button className="buyButton">Comprar</button>
        </div>
      </div>
    </section>
  )
}
