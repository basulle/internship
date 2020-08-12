import React, { useCallback, useState, ChangeEvent, useEffect } from 'react';
import { Input, CircularProgress, Button } from '@material-ui/core';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { selectProfileState } from '../../core/selectors/profile';
import { loadAvatar, loadProfile, changeName, changeSecondName, uploadPhoto } from '../../core/thunks/profile';

import { signOut } from '../../core/thunks/auth';

const Home = (): JSX.Element => {
  const state = useSelector(selectProfileState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [image, setImage] = useState<string>();
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(loadAvatar());
    dispatch(loadProfile());
  }, [dispatch]);

  useEffect(() => {
    setName(state.user.name);
    setSecondName(state.user.secondName);
    setEmail(state.user.email);
    setBirthday(state.user.birthday);
    setAvatar(state.avatarUrl);
    setIsLoading(state.isLoading);
  }, [state]);

  const handleSignOut = useCallback(() => {
    dispatch(signOut(history));
  }, [dispatch, history]);

  const onNameChange = useCallback(({ target: { value } }) => {
    setName(value);
  }, []);

  const onSecondNameChange = useCallback(({ target: { value } }) => {
    setSecondName(value);
  }, []);

  const handleChangeName = useCallback(() => {
    dispatch(changeName(name));
  }, [name, dispatch]);

  const handleChangeSecondName = useCallback(() => {
    dispatch(changeSecondName(secondName));
  }, [secondName, dispatch]);

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
    dispatch(uploadPhoto(image));
    setUploaded(false);
  }, [image, dispatch]);

  return (
    <div className="home-container">
      <h1 className="title">Home Page</h1>
      <div className="to-graphs">
        <Link to="/graphs" style={{ textDecoration: 'none' }}>
          <img src="https://img.icons8.com/flat_round/32/000000/right--v1.png" alt="arrow" />
        </Link>
      </div>
      {isLoading ? (
        <div className="loader">
          <CircularProgress color="primary" size="6rem" />
        </div>
      ) : null}
      <div className="info">
        <div className="left-info">
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
        </div>
        <div className="right-info">
          <div className="infoRow">
            <h4>Email:</h4> <Input value={email} disabled inputProps={{ 'aria-label': 'description' }} />
          </div>
          <div className="infoRow">
            <h4>Name:</h4>
            <Input value={name} inputProps={{ 'aria-label': 'description' }} onChange={onNameChange} />
            <button type="button" onClick={handleChangeName}>
              <img src="https://img.icons8.com/ultraviolet/20/000000/edit-property.png" alt="Name" />
            </button>
          </div>
          <div className="infoRow">
            <h4>Second Name:</h4>
            <Input value={secondName} inputProps={{ 'aria-label': 'description' }} onChange={onSecondNameChange} />
            <button type="button" onClick={handleChangeSecondName}>
              <img src="https://img.icons8.com/ultraviolet/20/000000/edit-property.png" alt="SecondName" />
            </button>
          </div>
          <div className="infoRow">
            <h4>Birthday:</h4> <Input value={birthday} disabled inputProps={{ 'aria-label': 'description' }} />
          </div>
        </div>
      </div>
      <div>
        <Button
          variant="outlined"
          onClick={handleSignOut}
          color="secondary"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Home;
