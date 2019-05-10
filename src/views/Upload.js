import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {Button, CircularProgress} from '@material-ui/core';
import TextField from '@material-ui/core/es/TextField/TextField';
import './css/Upload.css';
import {upload} from '../utils/MediaApi';

class Upload extends Component {

  profileFileName;

  fr = new FileReader();

  componentDidMount() {
    console.log(this.profileFileName);
    this.fr.addEventListener('load', () => {
      this.setState((prevState) => ({
        ...prevState,
        imageData: this.fr.result,
      }));
    });
  }

  state = {
    file: {
      title: '',
      description: '',
      filedata: null,
      /*filename: undefined,*/
    },
    loading: false,
    imageData: null,
    filters: {
      brightness: 100,
      contrast: 100,
      warmth: 0,
      saturation: 100,
    },
    type: '',
  };

  handleFileChange = (evt) => {
    evt.persist();
    console.log(evt.target.files[0]);
    this.fr.readAsDataURL(evt.target.files[0]);
    this.setState((prevState) => ({
      ...prevState,
      type: evt.target.files[0].type,
      file: {
        ...prevState.file,
        filedata: evt.target.files[0],
      },
    }));
  };

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    console.log(value, name);

    this.setState((prevState) => ({
      file: {
        ...prevState.file,
        [name]: value,
      },
    }));
  };

  handleFileSubmit = (evt) => {
    console.log(evt);
    this.setState({loading: true});
    const fd = new FormData();
    fd.append('title', this.state.file.title);
    const description = `[d]${this.state.file.description}[/d][f]${JSON.stringify(
        this.state.filters)}[/f]`;
    fd.append('description', description);
    fd.append('file', this.state.file.filedata);

    upload(fd, localStorage.getItem('token')).then(json => {
      console.log(json);
      const fileID = json.file_id;
      fetch('http://media.mw.metropolia.fi/wbma/media/' + fileID)
      .then(response => response.json())
      .then((responseJSON) => {
            console.log(responseJSON);
            this.profileFileName = ('http://media.mw.metropolia.fi/wbma/uploads/' + responseJSON.filename);
            console.log(this.profileFileName);
          });
      setTimeout(() => {
        this.props.history.push('/profile');
        this.props.updateImages();
        this.setState({loading: false});
      }, 2000);
    });
  };



  render() {
    return (
        <React.Fragment>
          <div style={{
            backgroundImage: 'url(\'http://users.metropolia.fi/~joonaesa/pics/upload.jpg\')',
            width: '100vw',
            height: '100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            textAlign: 'center',
          }}>
            <h1>Upload</h1>
            <ValidatorForm className="upload" instantValidate={false}
                           onSubmit={this.handleFileSubmit}
                           onError={errors => console.log(errors)}>
              <TextValidator name="title" label="Title"
                             value={this.state.file.title}
                             onChange={this.handleInputChange}
                             validators={['required', 'minStringLength:3']}
                             errorMessages={[
                               'this field is required',
                               'minimum 3 charaters']}
                             fullWidth/>
              <TextValidator name="description" label="Description"
                             value={this.state.file.description}
                             onChange={this.handleInputChange}
                             validators={['required', 'minStringLength:3']}
                             errorMessages={[
                               'this field is required',
                               'minimum 3 charaters']}
                             fullWidth
                             multiline
                             rows={3}/>
              <TextField name="filedata" label="File"
                         value={this.state.file.filename}
                         type="file"
                         onChange={this.handleFileChange}
                         fullWidth/>
              <Button type="submit" variant="contained"
                      color="primary">Upload&nbsp;&nbsp;{this.state.loading &&
              <CircularProgress size={20} color="secondary"/>}</Button>
            </ValidatorForm>
          </div>
          {this.state.imageData !== null && this.state.type.includes('image')
          }
        </React.Fragment>
    );
  }
}

Upload.propTypes = {
  history: PropTypes.object,
  updateImages: PropTypes.func,
  profileFileName: PropTypes.object,
};

export default Upload;