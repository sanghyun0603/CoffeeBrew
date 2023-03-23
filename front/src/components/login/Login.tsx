import { useState, forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import tw from 'tailwind-styled-components';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(
  props: { children: React.ReactElement },
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 4 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={() => {
            onClose();
          }}
          sx={{
            position: 'absolute',
            paddingBottom: 1,
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export const LoginModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className="animate-bounce"
        onClick={() => {
          handleClickOpen();
        }}
      >
        로그인
      </button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="dialog-title"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: { backgroundColor: '#F3F3F3' },
        }}
      >
        <CustomDialogTitle onClose={handleClose}></CustomDialogTitle>
        <DialogContent>
          <LoginDiv>
            <img
              src={'logincoffee.svg'}
              width={360}
              height={312}
              alt="no_img"
            />
            <img src={'kakao.png'} width={240} height={60} alt="no_img" />
          </LoginDiv>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const LoginDiv = tw.div`flex flex-col justify-center items-center`;
