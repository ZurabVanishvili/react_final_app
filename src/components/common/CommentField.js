import { Box, Modal, TextField } from "@mui/material";
import { makeStyles } from "mui-styles";
import MainButton from "./MainButton";

const useStyles = makeStyles(() => ({
  modal: {
    "&.MuiBox-root": {
      position: "absolute",
      top: "46%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      backgroundColor: "#fff",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
      textAlign: "center",
      paddingTop: "4rem",
    },
  },
  modalBox: {
    "&.MuiBox-root": {
      width: "70%",
    },
  },
  textField: {
    "&.MuiFormControl-root": {
      marginBottom: "25px",
      lineHeight: "10px",
    },
  },
  fieldBtn: {
    "&.MuiButton-root": {
      marginBottom: "2rem",
    },
  },
}));

const CommentField = ({
  open,
  closeHandler,
  fieldValue,
  onChangeForms,
  addItem,
  editItem,
}) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={closeHandler}>
      <Box className={classes.modal}>
        <Box className={classes.modalBox}>
          <TextField
            variant="outlined"
            placeholder="write comment"
            className={classes.textField}
            multiline
            fullWidth
            row={5}
            value={fieldValue.body}
            onChange={(event) => onChangeForms("body", event.target.value)}
          />
          {fieldValue.user && (
            <TextField
              variant="outlined"
              label="username"
              className={classes.textField}
              fullWidth
              value={fieldValue.user.username}
              onChange={(event) =>
                onChangeForms("username", event.target.value)
              }
            />
          )}
          <>
            {fieldValue.id ? (
              <MainButton
                className={classes.fieldBtn}
                variant="outlined"
                name="Edit comment"
                onClick={() => editItem(fieldValue.id)}
              />
            ) : (
              <MainButton
                className={classes.fieldBtn}
                variant="outlined"
                name="add comment"
                onClick={addItem}
              />
            )}
          </>
        </Box>
      </Box>
    </Modal>
  );
};
export default CommentField;
