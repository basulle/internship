import React, { useCallback, useState, ChangeEvent, useEffect } from 'react';
import { Input } from '@material-ui/core';
import './styles.css';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { testState } from '../../core/selectors/signIn';

const Home = (): JSX.Element => {
  const state = useSelector(testState);
  const [image, setImage] = useState<string>();
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

  useEffect(() => {
    setName(state.user.name);
    setSecondName(state.user.secondName);
    setEmail(state.user.email);
    setBirthday(state.user.birthday);
    setAvatar(state.user.url);
  }, [state]);

  const signOut = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  const onNameChange = useCallback(({ target: { value } }) => {
    setName(value);
  }, []);

  const onSecondNameChange = useCallback(({ target: { value } }) => {
    setSecondName(value);
  }, []);

  const changeName = useCallback(() => {
    const user = firebase.auth().currentUser;
    firebase.database().ref().child('users').child(user.uid).child('name').set(name);
  }, [name]);

  const changeSecondName = useCallback(() => {
    const user = firebase.auth().currentUser;
    firebase.database().ref().child('users').child(user.uid).child('secondName').set(secondName);
  }, [secondName]);

  const selectPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (FileReader && file) {
      const fr = new FileReader();
      fr.onload = () => {
        setImage(fr.result as string);
      };
      fr.readAsDataURL(file);
    }
    setUploaded(true);
  };

  const uploadPhoto = async () => {
    const user = firebase.auth().currentUser;
    const response = await fetch(image);
    const blob = await response.blob();
    firebase
      .storage()
      .ref()
      .child('avatars')
      .child(user.uid)
      .put(blob)
      .then(() => setUploaded(false));
  };

  // if (!state.test) {
  //   return <Redirect to="/login" />;
  // }
  return (
    <div className="container">
      <h1>Home Page</h1>
      <div>
        <img
          alt="logo"
          className="logo"
          src={
            image ||
            avatar ||
            'https://www.clipartmax.com/png/full/103-1038980_bankers-and-professionals-meeting-regularly-for-luncheon-user-flat-icon-png.png'
          }
        />
      </div>
      {uploaded ? (
        <button type="button" onClick={uploadPhoto}>
          upload photo
        </button>
      ) : (
        <input type="file" onChange={selectPhoto} accept="image/*" />
      )}
      <div className="info">
        <div>
          Email: <Input value={email} disabled inputProps={{ 'aria-label': 'description' }} />
        </div>
        <div>
          Name:
          <Input value={name} inputProps={{ 'aria-label': 'description' }} onChange={onNameChange} />
          <button type="button" onClick={changeName}>
            Change name
          </button>
        </div>
        <div>
          Second Name:
          <Input value={secondName} inputProps={{ 'aria-label': 'description' }} onChange={onSecondNameChange} />
          <button type="button" onClick={changeSecondName}>
            Change second name
          </button>
        </div>
        <div>
          Birthday: <Input value={birthday} disabled inputProps={{ 'aria-label': 'description' }} />
        </div>
      </div>
      <div>
        <button type="button" onClick={signOut}>
          Exit
        </button>
        <button type="button">
          <Link to="/graphs" style={{ textDecoration: 'none' }}>
            Graphs
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
