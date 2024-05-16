import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home'
import Item from './pages/item'
import Result from './pages/results'
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
          element={<ErrorMessage message="No found page" />}
        />
      </Routes>
    </BrowserRouter>
  );
}