import React, { useCallback, useState, ChangeEvent, useEffect } from 'react';
import { Input } from '@material-ui/core';
import './styles.css';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { userState } from '../../core/selectors/auth';
import { uploadUserProfile } from '../../core/thunks/auth';
import { changeName, changeSecondName } from '../../core/services/profile';
import { signOut } from '../../core/services/auth';
import { uploadPhoto } from '../../core/services/profile';

const Home = (): JSX.Element => {
  const state = useSelector(userState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [image, setImage] = useState<string>();
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

  useEffect(() => {
    if (state.uploaded === false) {
      const user = firebase.auth().currentUser;
      dispatch(uploadUserProfile(user.uid));
    }
  }, [dispatch, state.uploaded]);

  useEffect(() => {
    setName(state.user.name);
    setSecondName(state.user.secondName);
    setEmail(state.user.email);
    setBirthday(state.user.birthday);
    setAvatar(state.user.url);
  }, [state]);

  const handleSignOut = useCallback(() => {
    signOut().then(() => history.push('/'));
  }, [history]);

  const onNameChange = useCallback(({ target: { value } }) => {
    setName(value);
  }, []);

  const onSecondNameChange = useCallback(({ target: { value } }) => {
    setSecondName(value);
  }, []);

  const handleChangeName = useCallback(() => {
    changeName(name);
  }, [name]);

  const handleChangeSecondName = useCallback(() => {
    changeSecondName(secondName);
  }, [secondName]);

  const selectPhoto = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  const handleUploadPhoto = useCallback(() => {
    uploadPhoto(image).then(() => setUploaded(false));
  }, [image]);

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
        <button type="button" onClick={handleUploadPhoto}>
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
          <button type="button" onClick={handleChangeName}>
            Change name
          </button>
        </div>
        <div>
          Second Name:
          <Input value={secondName} inputProps={{ 'aria-label': 'description' }} onChange={onSecondNameChange} />
          <button type="button" onClick={handleChangeSecondName}>
            Change second name
          </button>
        </div>
        <div>
          Birthday: <Input value={birthday} disabled inputProps={{ 'aria-label': 'description' }} />
        </div>
      </div>
      <div>
        <button type="button" onClick={handleSignOut}>
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
