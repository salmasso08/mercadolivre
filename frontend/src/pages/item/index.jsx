import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header';
import axios from 'axios';
import './styles.scss'

export default function Items() {
  const [data, setData] = useState(null);
  const id = useLocation().pathname.replace("/items/", "")

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

  const formatPrice = (number, currency) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
    }).format(number);
  }

  function replaceDescription(description) {
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

// {
//   "id": "MLB2614339639",
//   "item": {
//       "id": "MLB188064",
//       "name_categorie": "Bermudas e Shorts",
//       "title": "Short Praia Masculino Bermuda Verão Academia Treino Corrida",
//       "price": {
//           "currency": "BRL",
//           "decimals": 34.71
//       },
//       "path": [
//           "Calçados, Roupas e Bolsas",
//           "Bermudas e Shorts"
//       ],
//       "picture_url": "http://http2.mlstatic.com/D_771409-MLB52332889803_112022-O.jpg",
//       "condition": "new",
//       "description": "BERMUDA MASCULINA VOKER\n\nQualidade, conforto, resistência e muito estilo para você curtir uma praia, praticar esportes ou até mesmo passar o dia com amigos e familiares!\n\nENVIO:\nEm até em 24h úteis\n\nCARACTERÍSTICAS DO PRODUTO\n\n•Short 100% poliéster (tactel)\n• Costura reforçada\n• 2 bolsos laterais\n\nDIFERENCIAL\n\n(( PRODUTO ORIGINAL ))\n\n* PRODUTOS PRONTA ENTREGA\n* FABRICAÇÃO PRÓPRIA\n\nPERGUNTAS FREQUENTES:\n\n1) Anuncio Full é possível comprar mais de uma cor?\nSim, é possível. É só você selecionar cor e tamanho desejado e clicar em adicionar no carrinho e fazer esse processo em todas as cores que você desejar, após a escolha de todas as cores e tamanhos é só você clicar no carrinho no canto superior direito de sua tela e finalizar o pedido. Assim o FULL irá enviar todas as cores e tamanhos selecionados corretamente.\n\n2) Tem forro por dentro como se fosse uma cueca?\nNÂO. o produto é feito com um único tecido resistente, secagem rápida e altamente confortável.\n\n3) Os shorts ficam transparentes?\nNÂO. o material tactel é de ótima qualidade e não é fino fazendo com que ele não fique transparente."
//   }
// }