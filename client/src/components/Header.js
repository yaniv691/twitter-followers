import React from 'react';
import logo from '../logo.png';
function Header() {
  return (
    <header className="app-header">
      <h1>
        <img className="logo" src={logo} alt="Twitter Logo" />
        Twitter Followers
      </h1>
    </header>
  )
}

export default Header;