import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '@src/ducks/auth';
import { UserContainer } from '@src/containers/screens';
import { UserUpdateForm } from '@src/components/screens';
import formValidation from '@src/utils/form/formValidation';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ updateUser }, dispatch),
});

@UserContainer
@connect(undefined, mapDispatchToProps)
export default class UserUpdateContainer extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    state = {
        formErrors: {},
    };

    onSubmit = (updateUserData) => {
        const { actions, user } = this.props;

        this.setState({ formErrors: {} });

        formValidation({ updateUserData })
            .then(() => actions.updateUser(user.id, updateUserData))
            .catch((err) => this.setState({ formErrors: err.updateUserData }));
    }

    render() {
        const { user } = this.props;
        const { formErrors } = this.state;

        return (
            <UserUpdateForm
                user={user}
                formErrors={formErrors}
                onSubmit={this.onSubmit}
            />
        );
    }
}
