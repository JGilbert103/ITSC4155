import React from 'react';
import '../css/about.css';
import CharlotteLogo from "../src/assets/UNC_Charlotte_Primary_Horiz_Logo.png";
import MicoHeadshot from "../src/assets/Mico_Headshot.jpg";




export const About = () => {
  return (
    <>
      <section id="main" className="disableOverflow">
        <figure className="image">
          <img className="img-aboutus" src="../images/copy.png" alt="About background" />

          <h1 className="us-title">About Us</h1>

          <div className="card-overlay">
            <div className="card-grid">
              <div className="id-card">
                <div className="id-header">
                <img src={CharlotteLogo} alt="Charlotte Logo" className="logo" />
                </div>
                <div className="gold-divider"></div>
                <div className="id-body">
                  <p className="id-name">Jake Gilbert</p>
                  <p className="id-year">Senior</p>
                  <p className="id-label">ID#: 800000000</p>
                  <p className="id-label">Exp: 05/9/2025</p>
                </div>
              </div>

              <div className="id-card">
                <div className="id-header">
                <img src={CharlotteLogo} alt="Charlotte Logo" className="logo" />
                </div>
                <div className="gold-divider"></div>
                <div className="id-body">
                  <p className="id-name">Danielle Freeman</p>
                  <p className="id-year">Senior</p>
                  <p className="id-label">ID#: 102938123</p>
                  <p className="id-label">Exp 05/29/2025</p>
                </div>
              </div>

              <div className="id-card">
                <div className="id-header">
                <img src={CharlotteLogo} alt="Charlotte Logo" className="logo" />
                </div>
                <div className="gold-divider"></div>
                <div className="id-body">
                  <p className="id-name">Tess Shugarman</p>
                  <p className="id-year">Senior</p>
                  <p className="id-label">ID#: 102938123</p>
                  <p className="id-label">Exp 05/29/2025</p>
                </div>
              </div>

              <div className="id-card">
                <div className="id-header">
                <img src={CharlotteLogo} alt="Charlotte Logo" className="logo" />
                <img src={MicoHeadshot} alt="Mico Headshot" className="mHeadshot" />
                </div>
                <div className="gold-divider"></div>
                <div className="id-body">
                  <p className="id-name">Mico Masangkay</p>
                  <p className="id-year">Senior</p>
                  <p className="id-label">ID#: 102938123</p>
                  <p className="id-label">Exp 05/29/2025</p>
                </div>
              </div>
            </div>
          </div> 
        </figure>
      </section>
    </>
  )
}