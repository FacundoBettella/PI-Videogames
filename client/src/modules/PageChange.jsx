import './PageChange.css';
import React from 'react';

function PageChange ({ postPage, allPostPage, paginate, totalPosts }) {
    let pageNumber = []; //Q de paginas
    
    let postsPerPage =  totalPosts > 0 && totalPosts < 16 ? postPage : allPostPage; 
    
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage ); i++) {
        pageNumber.push(i);
    }

    return(
        <nav className='paginate'>
            <ul className='pages'>
                {
                    pageNumber &&
                    pageNumber.map(number => (
                        <li className='page' key={number}> 
                            <button className='pagenumber' onClick={() => paginate(number)}>
                                {number}
                            </button>
                        </li>
                    ))
                }           
            </ul>
        </nav>
    )
}
export default PageChange;