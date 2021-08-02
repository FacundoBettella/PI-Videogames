import './Create.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGenre, submit } from '../actions/index';
import { GrSend } from 'react-icons/gr';
import { IoMdBackspace } from 'react-icons/io';
import { SiAtari, SiNintendo, SiNintendoswitch, SiSega, SiPlaystation, SiXbox } from 'react-icons/si';
import { GrPersonalComputer } from 'react-icons/gr';

function Create( props ) {
    // Estado local
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        genres: []
    })

    const [render, setRender] = useState(false);

    const PLATFORM = ["PS4", "PS5", "PC", "SEGA", "NINTENDO 64", "NINTENDO SWITCH", "ATARI", "XBOX ONE", "XBOX X", "GAME BOY ADVANCED"];
    
    useEffect(()=> {
        props.getGenre()  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Se ejecuta una unica vez, la primera vez que se renderiza el componente.
        
    function handleSubmit(e){
        e.preventDefault();
        props.submit(input);
        setInput({
            name: "",
            description: "",
            released: "",
            rating: 0,
            platforms: [],
            genres: []
        });
        setRender(true)
    };

    function handleInputChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    };

    function handlePlatformsCheck(e){
        let target = e.target.value;
        if(e.target.checked){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
        else{
            setInput({
                ...input,
                platforms: input.platforms.filter((e) => e !== target)
            })
        }
    };

    function handleCheck(e) {
        let target = e.target.value;
        if(e.target.checked) {
            // console.log(e.target.checked)
            setInput({
                ...input,
                genres : [...input.genres, e.target.value]
            });
        }
        else {
            // console.log(e.target.checked)
            setInput({
                ...input,
                genres: input.genres.filter((e) => e !== target)
            })   
        }
    };

    return (
        <div className='appCreate'>
                <nav className='toSearchButton'>
                    <div className='linkToHomeButton'>
                        <Link to='/home'>
                            <IoMdBackspace size={25} color={'#7e44a5'}/>
                        </Link>
                    </div>
                </nav>
                <div className='divTitleConteiner'>
                    <h1 className='createTitle'>                        
                        Share your videogame with us! 
                    </h1>
                </div>
                <div className='createCard'>
                    <form className='formCard'>
                        <div className='formInputs'>
                        <label className='labels'>Name: </label>
                            <input 
                                className='nameInput' 
                                autoComplete="off" 
                                type="text" 
                                name="name" 
                                onChange={handleInputChange} 
                                value={input.name}
                            />
                        </div>
                        <div className='formInputs'>
                        <label className='labels'>
                                Describe your project a little: </label>
                            <input 
                                className='titleInput' 
                                autoComplete="off" 
                                type="text" 
                                name="description" 
                                onChange={handleInputChange} 
                                value={input.description}
                            />
                        </div>
                        <div className='formInputs'>
                        <label className='labels'>Release date: </label>
                            <input 
                                className='releaseInput' 
                                autoComplete="off" 
                                type="date" 
                                name="released" 
                                onChange={handleInputChange} 
                                value={input.released}
                            />
                        </div>
                        <div className='formInputs'>
                        <label className='labels'>
                            From 0 to 100, what is the score?: </label>
                            <input 
                                className='scoreInput' 
                                autoComplete="off" 
                                type="number" 
                                name="rating" 
                                min="0" max="100"
                                onChange={handleInputChange} 
                                value={input.rating}
                            />
                        </div>
                        <div className='formInputs'>
                            <label className='labels'>Platforms: </label>
                            <p className='platformsInput'>
                                {
                                    PLATFORM.sort().map((e)=> (
                                        <label className='checksInputs' key={e}>
                                            <input
                                                type="checkbox"
                                                name="platforms"
                                                value={e}
                                                onClick={(e)=>handlePlatformsCheck(e)}
                                                key={e}
                                                />
                                            {e}    
                                        </label>
                                    ))
                                }
                            </p>
                        </div>
                        <div className='formInputs'>
                        <label className='labels'>Choose the genres: </label>
                            <p>
                                {
                                    props.genres.length > 0 && props.genres.map((e) => (
                                        <label className='checksInputs' key={e}>
                                            <input
                                                type="checkbox"
                                                name= "genres"
                                                value={e}
                                                onClick={(e) =>handleCheck(e)}
                                                key={e}
                                            />
                                            {e}
                                        </label>
                                    ))
                                }
                            </p>                         
                        </div>
                        <div className='finalMessage'>
                            <p className='renderMessage&Icon'>
                                {render && "What a lucky day, a new challenge!"}
                                {render && <GrSend/>}                        
                            </p>
                        </div>
                        <input type='submit' value='Submit' className='submitButton' onClick={handleSubmit}/>
                    </form>
                </div>
                <footer id='createFooter'>
                    <div className='platformIcons'>
                        <SiAtari size={22}/>   <SiNintendo size={22}/>   <SiNintendoswitch size={22}/>   <SiSega size={22}/>   <SiPlaystation size={22}/>   <SiXbox size={22}/>   <GrPersonalComputer size={22}/>                                    
                    </div>              
                </footer>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        genres: state.genres,
        videogameCreated: submit.videogameCreated,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getGenre: () => dispatch(getGenre()),
        submit: payload => dispatch(submit(payload)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Create);