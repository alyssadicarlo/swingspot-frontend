import './index.scss';

const PlaceholderCards = () => {
    const cards = [];

    for (let i = 0; i < 5; i++) {
        cards.push(
            <div key={i} className="box-placeholder">
                <div>
                    <h4 className="text"></h4>
                </div>
                <div className="excerpt">
                    <div className="text line"></div>
                    <div className="text"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            {cards}
        </>
    );
}

export default PlaceholderCards;