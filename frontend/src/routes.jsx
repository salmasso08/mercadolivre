import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home'
import Result from './pages/results'
import Item from './pages/item'
import ErrorMessage from './components/ErrorMessage'

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/items' element={<Result />} />
        <Route exact path='/items/:id' element={<Item />} />
        <Route
          path="*"
          element={<ErrorMessage message="Está página não existe" />}
        />
      </Routes>
    </BrowserRouter>
  );
}