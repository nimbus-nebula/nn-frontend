import React from 'react';
import '../../App.css';

const logo: string = `${process.env.PUBLIC_URL}/nn-logo.svg`;

function OnLogin(){

}
function Home() {
    return (
        <div className="app">
            <header className="app-header">
                <img src={logo} className="app-logo" alt="logo"/>
                <p>
                    "Create Your Cluster of Files"
                </p>
                <form>
                    <h3> Email </h3>
                    <input type="text" id="fname" name="fname" placeholder={"Email"}/> <br/>
                    <h3> Password </h3>
                    <input type="password" id="fname" name="fname" placeholder={"Password"}/> <br/>
                    <input type={"submit"} value={"Log In"} onSubmit={OnLogin}/>
                </form>
            </header>
        </div>
    );
}

export default Home;
