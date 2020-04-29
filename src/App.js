import React from 'react';
import './App.css'
import Board from './Board/Board'
import backImg from './img/back.jpg'
import img1 from './img/img1.png'
import img2 from './img/img2.jpg'
import img3 from './img/img3.jpg'
import img4 from './img/img4.png'
import img5 from './img/img5.png'
import img6 from './img/img6.png'
import img7 from './img/img7.png'
import img8 from './img/img8.png'

function App() {
    const cards = buildCards()
    return (
        <div className="App">
            <h1>Memory Game</h1>
            <Board cards={cards} /> 
        </div>
    )
}

export default App


function buildCards() {
    let id = 0;
    const images = {img1,img2, img3, img4,img5,img6, img7, img8}
    const cards = Object.keys(images).reduce((result, item) =>{
        const getCard = () => ({
            id: id++,
            type: item,
            backImg,
            frontImg: images[item],
            flipped: false,
        })
        return [...result, getCard(), getCard()]
    }, [])
    return copyCards(cards)
}

function copyCards(arr) {
    let len = arr.length
    for(let i = 0; i < len; i++) {
        let randomIdx = Math.floor(Math.random() * len)
        let copyCurrent = {...arr[i]}
        let copyRandom = {...arr[randomIdx]}
        arr[i] = copyRandom
        arr[randomIdx] = copyCurrent
    }
    return arr
}

