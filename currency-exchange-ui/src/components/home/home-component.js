import React from 'react';
import ConvertSection from '../convert/convert-section-component';
import './home-component.css'

function Home() {
  return (<section class="home-section">
  <div
    class="bgimg"
  >
    <div class="row center">
      <div class="home-content">
        <h1>The World's Trusted Currency Authority</h1>
        <p>
          Check exchange rates, send money internationally, and free
          currency tools
        </p>
      </div>
    </div>
    <div class="wrapper">
      <div class="wrapper-top center">
        <ul>
          <li data-li="convert">
            <p>Convert</p>
          </li>
          <li data-li="send">
            <p>Send</p>
          </li>
          <li data-li="charts">
            <p>Charts</p>
          </li>
          <li data-li="alerts">
            <p>Alerts</p>
          </li>
        </ul>
      </div>
      <div class="wrapper-bottom">
        <div class="container">
          <div class="item convert">
            <div class="item-info">
              <ConvertSection></ConvertSection>
            </div>
          </div>
          <div class="item send">
            <div class="item-info"></div>
          </div>
          <div class="item charts"></div>
          <div class="item alerts"></div>
        </div>
      </div>
    </div>
  </div>
</section>);
}

export default Home;
