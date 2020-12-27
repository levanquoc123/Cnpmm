import React, { Component } from 'react';
import { connect } from 'react-redux';

import Books from '../../components/Book/Books';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Book extends Component {
    componentDidMount () {
        this.props.onFetchBook();
    }

    render () {
        let book = <Spinner />;
        if ( !this.props.loading ) {
            book = this.props.book.map( books => (
                <Books
                    key={books.id}
                    username={books.username}
                    todo={books.todo}
                    isDone={books.isDone}
                    hasAttachment={books.hasAttachment} />
            ) )
        }
        return (
            <div>
                {book}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchBook: () => dispatch( actions.fetchBooks() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Book, axios ) );