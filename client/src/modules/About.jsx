import './About.css';
import { Link } from "react-router-dom";
import { IoMdBackspace } from 'react-icons/io';


export default function About() {
    return (
        <div className='appAboutPage'>
                <div className='aboutContainer'>
                    <div className='linkToHomeButton'>
                            <Link to='/home'>
                                <IoMdBackspace size={25} color={'#7e44a5'}/>
                            </Link>
                    </div>
                    <div className="titleAboutContainer">
                        <p className="aboutTitle">
                        Hi there! My name is Facundo Bettella Iunnissi and i'am a full stack development and Psychologist.
                        I am very motivated to constantly improve what I already know and to incorporate new tools. 
                        </p>
                        <br/>
                        <p className="aboutTitle">
                            this application uses:
                        </p>
                        <div className="usedTools">
                            <a target='_blank' rel="noreferrer" href='https://www.javascript.com/'>
                                <img className="toolImage" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"  alt="Javascript" height="40" width='48' style={{verticalAlign:'top', margin:'4px'}} /> 
                            </a>
                            <a target='_blank' rel="noreferrer" href='https://reactjs.org'>
                                <img className="toolImage" src="https://rosolutions.com.mx/blog/wp-content/uploads/2019/06/1-y6C4nSvy2Woe0m7bWEn4BA.png" alt="react" height="40" style={{ verticalAlign:'top', margin:'4px' }} />
                            </a>
                            <a target='_blank' rel="noreferrer" href='https://redux.js.org'>
                                <img className="toolImage" src="https://www.cloudsavvyit.com/p/uploads/2021/02/99128fa6.jpg?width=1198&trim=1,1&bg-color=000&pad=1,1" alt="redux" height="40" style={{ verticalAlign:'top', margin:'4px' }} /> 
                            </a>
                            <a target='_blank' rel="noreferrer" href='https://nodejs.org/en'>
                                <img className="toolImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png" alt='node' height="40" style={{ verticalAlign:'top', margin:'4px' }} /> 
                            </a>
                            <a target='_blank' rel="noreferrer" href='https://www.postgresql.org'>
                                <img className="toolImage" src="https://miro.medium.com/max/2000/1*3zADeX-f3kiPritXGxEFgw.png" alt="postgreSQL" height="40" style={{ verticalAlign:'top', margin:'4px' }} /> 
                            </a>
                            <a target='_blank' rel="noreferrer" href='https://sequelize.org/'>
                                <img className="toolImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYg_FBiB0q-O0Z2WpI18qUXsfBjRamOD1HLevbBlEurTsrLKVfeAXGM1wKFZU2IdpkHHU&usqp=CAU"  alt="sequelize" height="40" width='45' style={{ verticalAlign:'top', margin:'4px' }}/> 
                            </a>
                        </div>
                        <div className='aboutLinks'>
                            <p className="aboutTitle">
                                let's talk here:
                            </p>
                            <div className="cvLinks">
                                    <a target='_blank' rel="noreferrer" href="https://linkedin.com/in/facundo-bettella-iunnissi-dev/">
                                        <img className="toolImage" src="https://esemanal.mx/revista/wp-content/uploads/2020/09/LinkedIn-Icon-squircle-1.png" width="40" alt='linkedin' style={{margin:'5px'}} />
                                    </a> 
                                    <a target='_blank' rel="noreferrer" href="https://wa.link/02lwxl">
                                        <img className="toolImage" src="https://pngimg.com/uploads/whatsapp/whatsapp_PNG95158.png" width="40" alt='whats app' style={{margin:'5px'}}/>
                                    </a> 
                                    <a target='_blank' rel="noreferrer" href="https://github.com/FacundoBettella">
                                        <img className="toolImage" src="https://www.seekpng.com/png/small/979-9791307_github-logo-png-cat-logo-social-media.png" width="40" alt='email' style={{margin:'5px'}}/>
                                    </a> 
                            </div>
                        </div>
                    </div>
                </div>
            <footer className="footer">
                <h3>
                    Labs Individual Project - Henry Fullstack Academy 2021
                </h3>
            </footer>    
        </div>
    )
}
