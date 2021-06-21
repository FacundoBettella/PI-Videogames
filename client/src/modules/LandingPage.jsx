import { Link } from "react-router-dom";
import './LandingPage.css';

export default function LandingPage() {
    return (
        <div className='appLandingPage'>
                <div className='container'>
                    <div className="titleContainer">
                        <h3 className="title">
                            Enjoy our open video game database. Thanks for coming!
                        </h3>
                    </div>
                    <div className="enter">
                        <Link to='/home' className='enterButton'>Welcome</Link>
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
