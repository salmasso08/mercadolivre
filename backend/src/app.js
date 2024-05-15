const express = require('express');
const Search = require('./routes/search');
const Item = require('./routes/item');

const app = express();
const PORT = process.env.PORT || 3000;

//Search
app.get('/api/items/', async (req, res) => {
  try {
    const query = req.query.search;
    const search = new Search(query);
    const searchData = await search.fetchData();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(searchData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer a busca' });
  }
});

//Item
app.get('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const item = new Item(id);
    const searchItem = await item.fetchData();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(searchItem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do produto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
