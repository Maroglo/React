import React, {useState, useEffect} from 'react'
import Card from '../Card/Card'
import './Board.css'

const Board = props => {
    const [cards, setCards] = useState(props.cards)
    const [checkers, setCheckers] = useState([])
    const [completed, setCompleted] = useState([])
   
    const onCardClick = card => () => {
        if (flippedOff(checkers) || flippedOn(checkers, card)) return
        const newCheckers = [...checkers, card]
        setCheckers(newCheckers)
        const sameCards = validateCheckers(newCheckers)
        if (sameCards) {
            setCompleted([...completed, newCheckers[0].type])
        }
        if (flippedOff(newCheckers)) {
            resetCheckers(1000)
        }
        function validateCheckers(checkers) {
            return checkers.length === 2 &&
            checkers[0].type === checkers[1].type
        }
        function flippedOn(checkers, card){
          return checkers.length === 1 && checkers[0].id === card.id     
        }
        function flippedOff(checkers){
            return checkers.length === 2
        }
        function resetCheckers(time){
            setTimeout(() => {
                setCheckers([])
            }, time)
        }
        
    }

    useEffect(() => {
        const newCards = cards.map(card =>({
            ...card,
            flipped:
            checkers.find(c => c.id === card.id) ||
            completed.includes(card.type),
        }))
        setCards(newCards)
    }, [checkers, completed])
    return (
        <div className="Board">
            {cards.map(card => (<Card {...card} onClick={onCardClick(card)} key={card.id} />
            ))}
        </div>
    )
}

export default Board