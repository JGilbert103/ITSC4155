import React from 'react';
import '../css/about.css';
import CharlotteLogo from "../src/assets/UNC_Charlotte_Primary_Horiz_Logo.png";
import MicoHeadshot from "../src/assets/Mico_Headshot.png";
import TessHeadshot from "../src/assets/Tess_Headshot.jpg";
import JakeHeadshot from "../src/assets/Jake_Headshot.png";




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
                <img src={JakeHeadshot} alt="Jake Headshot" className="jHeadshot" />
                </div>
                <div className="gold-divider"></div>
                <div className="id-body">
                  <p className="id-name">Jake Gilbert</p>
                  <p className="id-year">Senior</p>
                  <p className="id-label">ID#: 801317781</p>
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
                <img src={TessHeadshot} alt="Tess Headshot" className="tHeadshot" />
                </div>
                <div className="gold-divider"></div>
                <div className="id-body">
                  <p className="id-name">Tess Shugarman</p>
                  <p className="id-year">Senior</p>
                  <p className="id-label">ID#: 801337590</p>
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
                  <p className="id-name">Mico Masangkay (Front End)</p>
                  <p className="id-year">Senior</p>
                  <p className="id-label">ID#: 801185563</p>
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