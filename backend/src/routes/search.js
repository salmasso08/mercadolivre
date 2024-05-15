const axios = require('axios');
const baseURL = 'https://api.mercadolibre.com/'
class Search {
  constructor(query) {
    this.query = query;
  }

  async fetchData() {
    try {
      const resp = await axios.get(`${baseURL}/sites/MLB/search?q=${this.query}`);

      if (!resp) {
        return res.status(401).json({ error: 'Search not Found' });
      }

      const { results } = resp.data;

      const responseCategory = await Promise.all(
        results.map(async result => {
          const promisseCategory = await axios.get(`${baseURL}/categories/${result.category_id}`)
            .catch(() => {
              throw new Error('Id das categorias não foram encontrados');
            });
          return { promisseCategory };
        })
      );

      const categoriesData = responseCategory.map(categ => {
        return {
          categories: categ.promisseCategory.data.name,
        };
      });

      if (!categoriesData) {
        return res
          .status(400)
          .json({ error: 'Não foi possível consltar as categorias' });
      }

      const categories = [results.map((c, i) => categoriesData[i].categories)]

      const items = results.map(item => {
        return {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: item.available_quantity,
            decimals: item.price,
          },
          picture_url: item.thumbnail,
          condition: item.condition,
          free_shiping: item.shipping.free_shipping,
        }
      });

      const resultado = {
        query: this.query,
        categories,
        items
      }
      return (resultado);

    } catch (error) {
      throw new Error('Erro ao obter os dados da API');
    }
  }
}

module.exports = Search;
