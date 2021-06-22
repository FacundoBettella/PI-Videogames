import './Detail.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PacmanLoader from "react-spinners/PacmanLoader";
import { IoMdBackspace } from 'react-icons/io';

function Detail( { videogameDetail } ) {

    const stripHtml = (html) => {
        // Crea un nuevo elemento div
        let temporalDivElement = document.createElement("div");
        // Establecer el contenido HTML con el dado
        temporalDivElement.innerHTML = html;
        // Recuperar la propiedad de texto del elemento (compatibilidad con varios navegadores)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }

    return (
       <div className='appDetail'>
                    <Link to='/home' className='linkToHome'>
                       <IoMdBackspace size={35} color={'#9c5bc7'}/>
                    </Link>
                <div className='rendering'>
                        { videogameDetail.data ? 
                            <div className='videoCard'>
                                <div className='detailInfo'>
                                {
                                    videogameDetail.data.image === null || !videogameDetail.data.image ?
                                    <img src='https://wallpapercave.com/wp/wp7072099.jpg' alt="Img not found"  className="videogameImages"/> :
                                    <img className="videogameImages" src={videogameDetail.data.image} alt='https://wallpapercave.com/wp/wp7072099.jpg' /> 
                                }
                                </div>
                                <div className='detailInfoName'>
                                    <h3 className='nameDetail'>
                                        {videogameDetail.data.name}
                                    </h3>
                                </div>
                                <div className='detailInfoScore'>
                                    <h4 className='detailScore'>
                                        Rating: {videogameDetail.data.rating}
                                    </h4>
                                </div>
                                <div className='detailInfo'>
                                    <p id='descriptionDetail'>
                                        {stripHtml(videogameDetail.data.description)}
                                    </p>
                                </div>
                                <div className='detailInfoP'>
                                    <ul className='mapsDetailP'>
                                        {   
                                            videogameDetail.data.platforms.map((e)=>(
                                                <li className="platform">{e}</li>
                                                ))   
                                            }
                                    </ul>
                                </div>
                                <div className='detailInfoG'>
                                    <ul className='mapsDetailG'>
                                        {   
                                            videogameDetail.data.genres.map(e => (
                                                <li  className="genre" id={e}>
                                                    {
                                                        e.name? e.name: e
                                                    }
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div> 
                            </div>  
                            :
                            <div className='pacLoading'>
                                <PacmanLoader color={"#429B9E"} loading={true}  size={60} />    
                            </div>
                        }
                </div>
                <footer id="Detailfooter">
                    <h3>
                        Videogame Search APP - External and local requests / 2021
                    </h3>
                </footer>    
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        videogameDetail: state.videogameDetail
    }
};
export default connect(mapStateToProps, null)(Detail);