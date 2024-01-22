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
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
    },
  },
  headBoxAdd: {
    "&.MuiBox-root": {
      width: "100%",
      backgroundColor: "#0097a7",
      padding: "1em 20px",
      color: "white",
      textAlign: "center",
    },
  },
  headBoxEdit: {
    "&.MuiBox-root": {
      width: "100%",
      backgroundColor: "#ec9345",
      padding: "1em 20px",
      color: "white",
      textAlign: "center",
    },
  },
  fieldsBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
  textField: {
    "&.MuiFormControl-root": {
      marginBottom: "15px",
      lineHeight: "10px",
    },
  },
  fieldChildBox: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "1.3rem",
  },
  modalAddBtn: {
    "&.MuiButtonBase-root": {
      width: "9rem",
      alignItems: "center",
      textTransform: "none",
      marginBottom: "20px",
    },
  },
  modalEditBtn: {
    "&.MuiButtonBase-root": {
      width: "9rem",
      alignItems: "center",
      textTransform: "none",
      backgroundColor: "#ec9345",
      border: "1px solid #f1ae73",
      color: "white",
      marginBottom: "20px",
      "&:hover": {
        backgroundColor: "#f1ae73",
        border: "1px solid #f1ae73",
      },
    },
  },
  boxOfBtns: {
    textAlign: "center",
  },
}));

const MainModal = ({
  open,
  closeHandler,
  modalTitle,
  name,
  columns,
  fieldValue,
  onChangeForms,
  addItem,
  editItem,
}) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={closeHandler}>
      <Box className={classes.modal}>
        <Box
          className={fieldValue.id ? classes.headBoxEdit : classes.headBoxAdd}
        >
          <h3>
            {fieldValue.id ? "Edit" : "Add some"} {modalTitle}
          </h3>
        </Box>
        <div className={classes.fieldsBox}>
          <div className={classes.fieldChildBox}>
            {columns.map((col, index) => (
              <TextField
                key={index}
                variant="outlined"
                label={col.field}
                className={classes.textField}
                size={"small"}
                defaultValue={fieldValue[col.field]}
                onChange={(event) =>
                  onChangeForms(col.field, event.target.value)
                }
              />
            ))}
            <div className={classes.boxOfBtns}>
              {fieldValue.id ? (
                <MainButton
                  name={`edit ${name}`}
                  onClick={editItem}
                  className={classes.modalEditBtn}
                  variant={"outlined"}
                />
              ) : (
                <MainButton
                  name={`Add ${name}`}
                  onClick={addItem}
                  className={classes.modalAddBtn}
                  variant={"outlined"}
                />
              )}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default MainModal;
