const axios = require('axios');
const baseURL = 'https://api.mercadolibre.com/'

class Item {
  constructor(id) {
    this.id = id;
  }

  async fetchData() {
    try {
      const [product, description] = await Promise.all([
        axios.get(`${baseURL}/items/${this.id}`),
        axios.get(`${baseURL}/items/${this.id}/description`),
      ]).catch(() => {
        throw new Error('Id does not found');
      });


      if (!product) {
        throw new Error('Product does not found');
      }

      if (!description) {
        throw new Error('Description does not exists');
      }

      const {
        category_id,
        title,
        price,
        currency_id,
        available_quantity,
        pictures,
        condition,
        free_shipping,
        sold_qty,
      } = product.data;

      const {
        plain_text
      } = description.data;
      
      const picture_url = pictures[0].url;
      
      const [categ] = await Promise.all([
        axios.get(`${baseURL}/categories/${category_id}`),
      ]).catch(() => {
        throw new Error('Id does not found');
      });

      const [...namePaths] = categ.data.path_from_root;
      const name_categorie = categ.data.name
      
      const itemData = {
        id: this.id,
        item: {
          id: category_id,
          name_categorie,
          title,
          price: {
            currency: currency_id,
            amount: available_quantity,
            decimals: price,
          },
          path: namePaths.map(namePath => namePath.name),
          picture_url,
          condition,
          free_shipping,
          sold_qty,
          description: plain_text
        },
      }
      return (itemData)
    } catch (error) {
      throw new Error('Erro ao obter os dados da API');
    }
  }
}

module.exports = Item;