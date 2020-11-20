import React,{useCallback, useState, useEffect} from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
// import EditIcon from '@material-ui/icons/Edit';
import {TextInput} from "../components/UIkit/index";
import { ImageArea } from '../components/UIkit/index';
import { useSelector } from 'react-redux';
import { getUserId } from '../../src/redux/users/selecotors';
import { db } from '../firebase/index';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },

}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="p">{children}</Typography>

    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Modal = (props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const usersRef = db.collection('users').doc(uid)
  const [images , setImages] = useState([]);

  useEffect(() => {
    const usersRef = db.collection('users').doc(uid);
    usersRef.get()
        .then((snapshot) => {
            const data = snapshot.data();
            setImages(data.userProfileImage);
      })
  }, [])

  return (
    <div>

      <Dialog className={classes.dialogWidth}
        // onClose={props.handleClose}
        aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title">
          ユーザー情報の編集
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <TextInput
                fullWidth={true} label={"ユーザー名"} multiline={false}
                rows={1} value={props.userName} type={"text"} 
                onChange={props.inputUserName}
            />
          </Typography>
          <Typography gutterBottom>
            <ImageArea images={images} setImages={setImages} title={"ユーザー画像の登録"}/>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => props.handleClose(props.userName, images)} color="primary">
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal