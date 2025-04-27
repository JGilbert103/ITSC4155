import React from 'react';
import '../../css/home.css';
import WelcomeNorm from "../../src/assets/WelcomePageNorm.gif"; 
import BellTower from "../../src/assets/UNCC_Bell_Tower.jpeg";

function Home() {
    return (
        <div className="homeContainer">
            <div className="leftSide">
                <div className="topWrapper">
                    <div className="textSection">
                        <div className="welcomeText">
                            Welcome to <br />
                            Niner <br />
                            Maintenance!
                        </div>

                        <div className="verticalLine"></div>

                        <div className="sloganText">
                            Your One-Stop <br />
                            Solution for Maintenance <br />
                            Request & Support
                        </div>
                    </div>
                </div>

                <div className="bottomWrapper">
                    <a href="/login" className="mascotLink">
                        <img src={WelcomeNorm} alt="Welcome Norm" className="mascotImage" />
                    </a>
                </div>
            </div>

            <div className="rightSide">
                <img src={BellTower} alt="UNC Charlotte Bell Tower" className="backgroundImage" />
            </div>
        </div>
    );
}

export default Home;
