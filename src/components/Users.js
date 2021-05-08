import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import { fetchUsers, fetchUserDetail } from "../actions/users";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Users = (props) => {
  const classes = useStyles();
  const { user, userID, fetchUsers, fetchUserDetail } = props;

  useEffect(() => {
    fetchUsers();
    fetchUserDetail(userID);
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position='absolute' color='primary' className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant='h6' color='inherit' noWrap>
            User
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image='src/public/logo.png'
              title='Coding Challenge'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {user.name}
              </Typography>

              <Typography variant='body2' color='textSecondary' component='p'>
                Email: {user.email}
              </Typography>

              <Typography variant='body2' color='textSecondary' component='p'>
                Phone: {user.phone}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size='small' color='primary'>
              Edit Account
            </Button>
            <Button size='small' color='secondary'>
              Close Account
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    user: state.users.user,
    userID: state.auth.user.uid,
  };
}

export default connect(mapStateToProps, { fetchUsers, fetchUserDetail })(
  withRouter(Users)
);
