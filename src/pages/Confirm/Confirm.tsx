import React from 'react';
import { Link } from 'react-router-dom';

const Confirm = (): JSX.Element => {
  return (
    <div>
      <h1>Confirm your Email</h1>
      <h4>
        {'Если Вы подтвердили электронную почту, то перейдите на страницу авторизации. '}
        <Link to="/login" style={{ textDecoration: 'none' }}>
          Login
        </Link>
      </h4>
    </div>
  );
};

export default Confirm;
