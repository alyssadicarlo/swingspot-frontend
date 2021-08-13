import './index.scss';

const PlaceholderCards = (props) => {
    const cards = [];

    for (let i = 0; i < props.count; i++) {
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