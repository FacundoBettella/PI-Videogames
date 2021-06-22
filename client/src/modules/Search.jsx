import './Search.css'
import './PageChange.css';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAll, getGenre, getVideoGame, getVideoGameDetail, sortAZ, sortScore, filterBy, previousFilterState } from '../actions/index';
import PacmanLoader from "react-spinners/PacmanLoader";
import { MdLocationSearching } from 'react-icons/md';
import PageChange from './PageChange.jsx';

function Search(props) {

    let nameRef = useRef('');

    useEffect(() => {
        props.getGenre();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [loading, setLoading] = useState(false);

    // --------------------------------------Paginado------------------------------------ 
    let currentPost;
    
    const [currentPage, setCurrentPage] = useState(1);
        
    const [postPage, setPostPage] = useState(4);// eslint-disable-line no-unused-vars
    
    const [allPostPage, setAllPostPage] = useState(18);// eslint-disable-line no-unused-vars
   
    const lastPostIndex = currentPage * postPage;//4-8
    const firstPostIndex = lastPostIndex - postPage;//0-4

    const lastAllPostIndex = currentPage * allPostPage;//15-30
    const firstAllPostIndex = lastAllPostIndex - allPostPage;//0-15
    
    props.videogamesLoaded.length > 0 && props.videogamesLoaded.length < 16 ?
    currentPost = props.videogamesLoaded.slice(firstPostIndex, lastPostIndex) :
    currentPost = props.videogamesLoaded.slice(firstAllPostIndex, lastAllPostIndex);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    };

    let changeUL = props.videogamesLoaded.length > 0 && props.videogamesLoaded.length < 16 ? 'ul' : 'AllUl'

    //-------------------------------------------Functions--------------------------------
    
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault(e);
        props.getVideoGame(nameRef.current.value);
        nameRef.current.value = ''; 
        setTimeout(() => {
            setLoading(false);
        }, 6500); 
    };

    const handleAZ = (e) =>{
        e.preventDefault();
        console.log(e.target.value)
        props.sortAZ(e.target.value);
        setCurrentPage(1);
    };

    const handleScore = (e) => {
        e.preventDefault();
        props.sortScore(e.target.value);
    };

    const handleFilter = (e) => {
        e.preventDefault();
        if(e.target.value === 'All'){
           props.previousFilterState()
        }
        else{
            props.filterBy(e.target.value);
        }
    };

    return (
        <div className='appSearch'>
            <nav className='searchNav'>
                <Link to='/create' className='createLink'>Tell us about your video game</Link>
                    <div className='searchConteiner'>
                        <form className='searchForm'>
                            <label className='searchInputLabel'>
                                <h3>
                                    <MdLocationSearching />
                                </h3>
                            </label>
                                <input
                                    className='searchInput'
                                    type='text'
                                    ref={nameRef}
                                    placeholder="  Find your videogame"
                                    />
                                <div className='divGoButtons'>
                                    <button type='submit' className="goButton" onClick={handleSubmit}> GO! </button>  
                                    <button type='submit' className="goButton" onClick={handleSubmit}> Get 100 </button>    
                                </div>
                        </form>
                    </div>
            </nav>
            {/*------------------------------------------------------------------------------------------------ */}
            <div className='selects'>
                <select id='azOrder' onChange={(e) => handleAZ(e)}>
                    <option value='AZ'>A-Z</option>
                    <option value='ZA'>Z-A</option>
                </select>
                <select id='scoreOrder' onChange={(e) => handleScore(e)}>
                    <option value='Max'>Max Score</option>
                    <option value='Min'>Min Score</option>
                </select>
                <select id='azOrder' onChange={(e) => handleFilter(e)}>
                        <option default id="all">All</option>
                    {
                        props.genres.length > 0 ?
                        props.genres.map((e) => (
                            <option id={e} value={e}>
                                {e}    
                            </option>
                        )):
                        <option id="notGenre">Not genres</option> 
                    }

                </select>    
            </div>
            <div className='card&Paginate'>
                <div className='videogameFound'>
                        <ul className={changeUL}>
                            {   
                                props.videogamesLoaded.length > 0 ?
                                props.videogamesLoaded.length < 16 ?
                                currentPost.map((e) => (
                                    <li className="cardLi" id={e.id}>
                                        <div className="videogameCard" id={e.id}>
                                            <Link 
                                                to={`/detail/${e.id}`}
                                                className="linkToDetail"
                                                onClick={()=> props.getVideoGameDetail(e.id)}  
                                                >
                                                {e.name}
                                            </Link>
                                                {
                                                    e.image?
                                                    <img className="videogameImage" src={e.image} alt='https://wallpapercave.com/wp/wp7072099.jpg' /> :
                                                <img src='https://wallpapercave.com/wp/wp7072099.jpg' alt="Img not found" className="videogameImage" />
                                                }
                                        </div>
                                    </li>
                                    ))
                                    :
                                    currentPost.map((e) => (
                                        <li className="allCardLi" id={e.id}>
                                            <div className="allVideogameCard" id={e.id}>
                                                <Link 
                                                    to={`/detail/${e.id}`}
                                                    className="linkToDetail"
                                                    onClick={()=> props.getVideoGameDetail(e.id)}  
                                                    >
                                                    {e.name}
                                                </Link>
                                                    {
                                                        e.image?
                                                        <img className="allVideogameImage" src={e.image} alt='https://wallpapercave.com/wp/wp7072099.jpg' /> :
                                                    <img src='https://wallpapercave.com/wp/wp7072099.jpg' alt="Img not found" className="allVideogameImage" />
                                                    }
                                            </div>
                                        </li>
                                        ))
                                        :                              
                                <PacmanLoader className='pacman' color={"#429B9E"} loading={loading} size={50} />
                            }
                    </ul>
                </div>
            </div>
            {
                currentPost ?
                <PageChange
                    postPage = {postPage}
                    allPostPage = {allPostPage}
                    totalPosts = {props.videogamesLoaded.length}
                    paginate = {paginate}
                /> 
                :
                null
            }
            <footer id="footer">
                <h3>
                    Videogame Search APP - External and local requests / 2021
                </h3>
            </footer>    
        </div>
    )
};
// Primero defino las props del componente.
// Luego, conecto el store y las actions con el componente.
const mapStateToProps = (state) => {
    return {
        videogamesLoaded: state.videogamesLoaded,
        videogameDetail: state.videogameDetail,
        genres: state.genres,
        filtered: state.filtered,
        submit: state.submit,
        videogamesBeforeFilter: state.videogamesBeforeFilter,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAll: () => dispatch(getAll()),
        getGenre: () => dispatch(getGenre()),
        getVideoGame: name => dispatch(getVideoGame(name)),
        getVideoGameDetail: id => dispatch(getVideoGameDetail(id)),
        sortAZ: payload => dispatch(sortAZ(payload)),
        sortScore: payload => dispatch(sortScore(payload)),
        filterBy: payload => dispatch(filterBy(payload)),
        previousFilterState: payload => dispatch(previousFilterState(payload)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);

