

export default function Die(props) {
    
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#7d8597"
    }
    return (
        <div className="dice-comp" style={styles} onClick={props.handleClick}>
            <h2>{props.value}</h2>
        </div>
    )
}