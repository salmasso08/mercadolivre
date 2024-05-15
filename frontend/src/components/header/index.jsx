import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"
import logo from "../../assets/Logo_ML.png"
import lupa from "../../assets/ic_Search.png"
import "./styles.scss"

export default function Header() {
  const term = new URLSearchParams(useLocation().search).get('search');

  const [inputValue, setInputValue] = useState(term || '');
  const navigateTo = useNavigate();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleNavigateSearch = (event) => {
    event.preventDefault();
    navigateTo(`/items?search=${inputValue}`);
  }

  return (
    <>
      <div className="content-search">
        <div className="search">
          <Link className="linkHome" to="/">
            <img src={logo} alt="Logo do mercado livre" />
          </Link>
          <form className="formSearch" onSubmit={handleNavigateSearch}>
            <input
              className="input"
              src={logo}
              alt="Logo do mercado livre"
              type="text"
              onChange={handleChange}
              value={inputValue} placeholder="Nunca dejes de buscar"
            />
            <button className="button" type="submit">
              <img src={lupa} alt="Lupara para pesquisar produtos" />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}