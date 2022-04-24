import React from 'react';
import './header-component.css'

function Header() {
  return (<header style={{
    display: "flex"
  }}>
    <div class="nav center">
        <img src={require("../../img/money-transfer-logo.png")} className="image-logo" alt="logo"/>
        <div class="righ-side">
            <li><a href="#" class="list">Converter</a> </li>
            <li class="list">Send money</li>
            <li class="list">Business & Api</li>
            <li class="list">Tools</li>
            <li class="list">Resources</li>
        </div>
    </div>

    <div class="btns">
        <li id="sign-in" class="header-btn">
            <a href="">Sign in</a>
        </li>
        <li id="get-app" class="header-btn"><a href="">Get the App</a></li>
    </div>
  </header>);
}

export default Header;
