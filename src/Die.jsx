export default function Die({value, isHeld,  holdFunc}) {

    const styles = {
        isHeld:{backgroundColor: "lightblue" },
        notHeld:{backgroundColor: "white", border: "none" }
    }

    return(
            <button onClick={holdFunc} 
            style={(isHeld ? styles.isHeld : styles.notHeld)}         
            className="die"
            aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`}
            >{value}
            </button>
    )
}