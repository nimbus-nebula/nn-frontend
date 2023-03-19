import React from 'react';
import '../../App.css';

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
                <div className='section-divider'>
                    <img src={divider} className="section-divider" alt="logo"/>
                </div>
                <form className='login-form'>
                    <div className='input-label-text-field'>
                        <h3 className='input-label'> Email </h3>
                        <input className='input-field' type="text" id="fname" name="fname" placeholder={"Email"}/> 
                    </div>
                    <div className='input-label-text-field'>
                        <h3 className='input-label'> Password </h3>
                            <input className='input-field' type="password" id="fname" name="fname" placeholder={"Password"}/> <br/>
                    </div> 
                    <input className='submit-button' type={"submit"} value={"Log In"} onSubmit={OnLogin}/> 
                    <a className='anchor' href="/signup">Create An Account</a> 
                </form>
            </header>
            <body>
            
            </body>
        </div>
    );
}

export default Home;
