import React from 'react';

import classes from './Books.css';

const books = ( props ) => {
    const books1 = [];

    for ( let bookName in props.books1 ) {
        books1.push(
            {
                username: bookName,
                amount: props.books1[bookName]
            }
        );
    }

    const bookOutput = books1.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
            key={ig.username}>{ig.username} ({ig.amount})</span>;
    });

    return (
        <div className={classes.Books}>
            <p>Books: {bookOutput}</p>
            {/* <p>Price: <strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p> */}
            <p>props.key</p>
            <p>props.username</p>
        </div>
    );
};

export default books;