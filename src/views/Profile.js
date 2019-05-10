import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';
//import Upload from './Upload';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 300,
    objectFit: 'cover',
  },
};

const Profile = (props) => {
  if (props.user === null) {
    return <Redirect to="/"/>;
  }

  const {username, email, full_name, profilePic} = props.user;
  const {classes} = props;
  return (
      <React.Fragment>
        <div style={{
          backgroundImage: 'url(\'http://users.metropolia.fi/~joonaesa/pics/prof.jpg\')',
          width: "100vw", height: "100vh", backgroundSize: "cover", backgroundRepeat: "no-repeat"
        }}>
          <div className="profiili">
            <h1>Profile</h1>
            <Card className={classes.card}>
              <CardActionArea>
                {/*
                    <Upload {...props} profileFileName={this.profileFileName}/>

                <CardMedia className={classes.media}
                       image={mediaUrl + profilePic.profileFileName} title={username}/>
            <CardContent>
            */}
                <CardMedia className={classes.media}
                           image={'http://media.mw.metropolia.fi/wbma/uploads/205ea9fdbaddb635ad113fc61471f610.png'} title={username}/>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Username: {username}
                  </Typography>
                  <Typography component="p">
                    Email: {email}
                  </Typography>
                  <Typography component="p">
                    Full name: {full_name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>
      </React.Fragment>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);