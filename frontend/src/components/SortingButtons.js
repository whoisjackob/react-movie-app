import React, { useState } from 'react';

const SortingButtons = (props) => {

        const [clicked, setClicked] = useState();

        return (
                
                <div className="buttons">
                        <button onClick={() => { props.alf(props.movies); setClicked(0) }} className={clicked === 0 ? "buttonc" : "button"}><span>Alfabetycznie</span></button>
                        <button onClick={() => { props.idup(props.movies); setClicked(1) }} className={clicked === 1 ? "buttonc" : "button"}><span>Według ID Rosnąco</span></button>
                        <button onClick={() => { props.iddown(props.movies); setClicked(2) }} className={clicked === 2 ? "buttonc" : "button"}><span>Według ID Malejąco</span></button>
                        <button onClick={() => { props.sortd(props.movies); setClicked(3) }} className={clicked === 3 ? "buttonc" : "button"}><span>Według Roku Wydania Rosnąco</span></button>
                        <button onClick={() => { props.sortdrev(props.movies); setClicked(4) }} className={clicked === 4 ? "buttonc" : "button"}><span>Według Roku Wydania Malejąco</span></button>
                        <button onClick={() => { props.sortdir(props.movies); setClicked(5) }} className={clicked === 5 ? "buttonc" : "button"}><span>Według Reżysera</span></button>
                        <button onClick={() => { props.sortrat(props.movies); setClicked(6) }} className={clicked === 6 ? "buttonc" : "button"}><span>Według Oceny Rosnąco</span></button>
                        <button onClick={() => { props.sortratrev(props.movies); setClicked(7) }} className={clicked === 7 ? "buttonc" : "button"}><span>Według Oceny Malejąco</span></button>
                </div>
        )
}

export default SortingButtons;