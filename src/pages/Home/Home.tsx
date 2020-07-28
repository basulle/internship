import React, { useEffect, useCallback, useState } from 'react';
import './styles.css';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { testState } from '../../core/selectors/signIn';

const Home = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const state = useSelector(testState);

  //   const uploadPhoto = (selectorFiles: FileList) => {
  //     firebase.storage().ref().child('photo').put();
  //   };

  const signOut = useCallback(() => {
    firebase.auth().signOut();
  }, []);
  if (!state.test) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <h1>Home Page</h1>
      <div>
        <img
          alt="logo"
          className="logo"
          src="https://i.pinimg.com/originals/11/ab/14/11ab147894a7d2ce866ff88a4aa63655.jpg"
        />
      </div>
      <input type="file" />
      <h4>Email: {email}</h4>
      <h4>Name: {name}</h4>
      <button type="button">Change name</button>
      <h4>Second Name: {secondName}</h4>
      <button type="button">Change second name</button>
      <h4>Birthday: {birthday}</h4>
      <button type="button" onClick={signOut}>
        Exit
      </button>
    </div>
  );
};

export default Home;
