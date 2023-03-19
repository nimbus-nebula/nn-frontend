import React from 'react';
import '../../App.css';

const logo: string = `${process.env.PUBLIC_URL}/nn-logo.svg`;
const divider: string = `${process.env.PUBLIC_URL}/section-div.svg`;

function OnLogin(){

}
function Home() {
    return (
        <div className="app">
            <header className="app-header">
                <div className='logo-section'>
                    <div className='logo-n'>
                        N
                        <div className='logo-remaining'>inbus ebula</div>
                    </div>
                    <div className='app-slogan'>
                        "Create Your Cluster of Files"
                    </div>
                </div>
                
                {/* <img src={logo} className="app-logo" alt="logo"/> */}
                {/* <img src={divider} className="section-divider" alt="logo"/> */}
                
                {/* <hr className='solid'/> */}
                <form className='login-form'>
                    <h3 className='input-label'> Email </h3>
                    <input type="text" id="fname" name="fname" placeholder={"Email"}/> <br/>
                    <h3> Password </h3>
                    <input type="password" id="fname" name="fname" placeholder={"Password"}/> <br/>
                    <input type={"submit"} value={"Log In"} onSubmit={OnLogin}/>
                </form>
            </header>
            <body>
            
            </body>
        </div>
    );
}

export default Home;
