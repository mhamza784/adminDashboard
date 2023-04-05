import React from 'react';
import { TableHead, DialogTitle, DialogContentText, DialogContent, DialogActions, Box, Button, Dialog } from '@mui/material';
import { deleteUserContainer, warningIcon, deleteBtn, cancelBtn } from "../style";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const DeleteUser = ({ handleClose, handleDelete, open }) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Box sx={deleteUserContainer}>
                <ErrorOutlineOutlinedIcon sx={warningIcon} />
                <DialogTitle sx={{ fontWeight: 600, fontSize: "2rem" }} id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are really want to delete this user
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={cancelBtn}>Cancel</Button>
                    <Button onClick={handleDelete} type="danger" sx={deleteBtn} autoFocus>
                        Yes, Delete it!
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default DeleteUser