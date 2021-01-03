import React, { Component } from 'react';
import { connect } from 'react-redux';

import Phones from '../../components/Phone/Phones';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Phone extends Component {
    componentDidMount () {
        this.props.onFetchPhone();
    }

    render () {
        let Phone = <Spinner />;
        if ( !this.props.loading ) {
            Phone = this.props.Phone.map( Phones => (
                <Phones
                    key={Phones.id}
                    username={Phones.username}
                    todo={Phones.todo}
                    isDone={Phones.isDone}
                    hasAttachment={Phones.hasAttachment} />
            ) )
        }
        return (
            <div>
                {Phone}
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
        onFetchPhone: () => dispatch( actions.fetchPhones() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Phone, axios ) );