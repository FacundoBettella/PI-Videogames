import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className='appLandingPage'>
                <div className='container'>
                    <div className="titleContainer">
                        <h3 className="title">
                        Hi there! My name is Facundo Bettella Iunnissi and i'am a full stack development and Pshicologyst.
                        If you want to know more about me, send me a message
                        </h3>
                    </div>
                    <div className="enter">
                        <Link to='/home' className='enterButton'>Back to /home</Link>
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
