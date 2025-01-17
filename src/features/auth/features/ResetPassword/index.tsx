import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { InjectedAuthReduxProps } from 'redux-auth-wrapper/history4/redirect';

import { useSpinner } from 'packages/spinner';

import { resetPasswordAction } from '../../ducks';
import { apiCallIds } from '../../api';

import ResetPassword from './view';

const mapDispatchToProps = {
  resetPassword: resetPasswordAction,
};

type Props = InjectedAuthReduxProps & typeof mapDispatchToProps;

const ResetPasswordContainer = ({ resetPassword }: Props) => {
  const { passwordResetToken } = useParams();
  const isLoading = useSpinner(apiCallIds.RESET_PASSWORD);

  const onSubmit = useCallback(values => resetPassword({ ...values, passwordResetToken }), [
    resetPassword,
    passwordResetToken,
  ]);

  return <ResetPassword isLoading={isLoading} onSubmit={onSubmit} />;
};

export default connect(
  undefined,
  mapDispatchToProps
)(ResetPasswordContainer);
