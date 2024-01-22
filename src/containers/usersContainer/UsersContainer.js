import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { makeStyles } from "mui-styles";
import { usersDataActions } from "../../redux/UsersDataSlice";
import { useSelector, useDispatch } from "react-redux";
import MainModal from "../../components/common/MainModal";
import MainTable from "../../components/common/MainTable";
import MainButton from "../../components/common/MainButton";
import AddIcon from "@mui/icons-material/Add";
import { modalShowActions } from "../../redux/ModalShowSlice";
import AppPagination from "../../components/Pagination/AppPagination";
import {
  addUserService,
  deleteUserService,
  editUserService,
  getUsersServices,
} from "../../api/services/UsersServices";

const useStyles = makeStyles(() => ({
  list: {
    "&.MuiList-root": {
      width: "80%",
    },
  },
  mainContainer: {
    "&.MuiGrid-root": {
      display: "flex",
      flexWrap: "nowrap",
      padding: "0 2rem",
      marginTop: "2em",
      gap: "1em",
      marginBottom: "10rem",
    },
  },
  tableBox: {
    "&.MuiGrid-root": {
      margin: "0 auto",
    },
  },
  loader: {
    position: "absolute",
    top: "46%",
    left: "46%",
    transform: "transition(-50%, -50%)",
    color: "#1C73AC",
  },
  addBtn: {
    "&.MuiButton-root": {
      marginBottom: "1em",
      textTransform: "none",
    },
  },
  active: {
    "&.MuiButtonBase-root": {
      backgroundColor: "#758889",
      color: "white",
      "&:hover": {
        backgroundColor: "#758889",
      },
    },
  },
}));

const UsersContainer = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [count, setCount] = useState();

  const pagingChange = (skip) => {
    getUsersServices(skip).then((res) => {
      const usersArray = res.data.users;
      dispatch(usersDataActions.pushDataUsers(usersArray));
    });
  };

  useEffect(() => {
    getUsersServices().then((res) => {
      const usersArray = res.data;
      setCount(Math.ceil(usersArray.total / 8));
      dispatch(usersDataActions.pushDataUsers(usersArray.users));
    });
  }, []);

  const allUsers = useSelector((state) => state.usersData.usersData);

  const addShowModal = useSelector((state) => state.modalShow.addModal);

  // ===================================================================
  const closeHandler = () => {
    dispatch(modalShowActions.hideAddModal());
    setFieldValue("");
  };

  const openHandler = () => {
    dispatch(modalShowActions.showAddModal());
  };

  // ===================================================================

  const addUser = () => {
    addUserService(fieldValue);

    dispatch(
      usersDataActions.addUser({
        ...fieldValue,
        id: Math.random().toString(),
      })
    );

    dispatch(modalShowActions.hideAddModal());
    setFieldValue("");
  };

  const editUser = () => {
    editUserService(fieldValue.id, fieldValue);

    dispatch(usersDataActions.editUser(fieldValue));

    setFieldValue("");
    dispatch(modalShowActions.hideAddModal());
  };

  const columns = [
    { field: "firstName", header: "Name" },
    { field: "lastName", header: "Surname" },
    { field: "gender", header: "Gender" },
    { field: "age", header: "Age" },
    { field: "birthDate", header: "BirthDate" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone" },
  ];

  const [fieldValue, setFieldValue] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    birthDate: "",
    email: "",
    phone: "",
  });

  const onChangeForms = (key, name) => {
    setFieldValue({ ...fieldValue, [key]: name });
  };

  const deleteUserHandler = (id) => {
    deleteUserService(id);
    dispatch(usersDataActions.deleteUser(id));
  };

  const editUserHandler = (user) => {
    dispatch(modalShowActions.showAddModal());

    setFieldValue({ ...user });
  };

  // ==================================================================

  return (
    <Grid container mt={2} className={classes.mainContainer}>
      {allUsers.length === 0 ? (
        <h3 className={classes.loader}>Loading...</h3>
      ) : (
        <Grid item xs={10} className={classes.tableBox}>
          <MainModal
            open={addShowModal}
            closeHandler={closeHandler}
            modalTitle="User"
            name="User"
            columns={columns}
            fieldValue={fieldValue}
            onChangeForms={onChangeForms}
            addItem={addUser}
            editItem={editUser}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <MainButton
              variant="outlined"
              name="Add User"
              className={classes.addBtn}
              icon={<AddIcon />}
              onClick={() => openHandler(true)}
            />
          </Box>
          <MainTable
            category="gender"
            data={allUsers}
            columns={columns}
            deleteItemHandler={deleteUserHandler}
            editItemHandler={editUserHandler}
          />
          <AppPagination count={count} pagingChange={pagingChange} />
        </Grid>
      )}
    </Grid>
  );
};
export default UsersContainer;
