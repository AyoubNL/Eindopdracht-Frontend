import ".//card.css"

function Card({h3,p}) {
    return (
        <section>
            <article>
                <h3>{h3}</h3>
                <p>{p}</p>
            </article>
        </section>
    );
}

export default Card;