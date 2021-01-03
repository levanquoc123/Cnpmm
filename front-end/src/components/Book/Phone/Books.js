import React from 'react';

import classes from './Phones.css';

const Phones = ( props ) => {
    const Phones1 = [];

    for ( let PhoneName in props.Phones1 ) {
        Phones1.push(
            {
                username: PhoneName,
                amount: props.Phones1[PhoneName]
            }
        );
    }

    const PhoneOutput = Phones1.map(ig => {
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
        <div className={classes.Phones}>
            <p>Phones: {PhoneOutput}</p>
            {/* <p>Price: <strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p> */}
            <p>props.key</p>
            <p>props.username</p>
        </div>
    );
};

export default Phones;