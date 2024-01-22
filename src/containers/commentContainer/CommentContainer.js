import { useEffect, useState } from "react";
import { makeStyles } from "mui-styles";
import { Box, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { commentsDataActions } from "../../redux/CommentsDataSlice";
import MainCard from "../../components/common/MainCard";
import MainButton from "../../components/common/MainButton";
import AddIcon from "@mui/icons-material/Add";
import CommentField from "../../components/common/CommentField";
import { modalShowActions } from "../../redux/ModalShowSlice";
import MainAccordion from "../../components/common/MainAccordion";
import { getPostsService } from "../../api/services/PostsServices";
import AppPagination from "../../components/Pagination/AppPagination";
import {
  addCommentsService,
  deleteCommentsService,
  getCommentsService,
  updateCommentsService,
} from "../../api/services/CommentsServices";

const useStyles = makeStyles(() => ({
  commentContainer: {
    "&.MuiGrid-root": {
      display: "flex",
      flexDirection: "column",
      padding: "0 2rem",
      marginTop: "2em",
      gap: "1em",
      marginBottom: "10rem",
      width: "69%",
      margin: "0 auto",
    },
  },
  cardAction: {
    "&.MuiCardActions-root": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  addBtn: {
    "&.MuiButton-root": {
      marginBottom: "1em",
      textTransform: "none",
    },
  },
  loader: {
    position: "absolute",
    top: "46%",
    left: "46%",
    transform: "transition(-50%, -50%)",
    color: "#1C73AC",
  },
  containerCard: {
    "&.MuiGrid-root": {
      display: "flex",
      flexWrap: "wrap",
      gap: "1em",
      alignItems: "center",
    },
  },
}));

const CommentContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [count, setCount] = useState();

  useEffect(() => {
    getPostsService().then((res) => {
      const postsArray = res.data;
      setCount(Math.ceil(postsArray.total / 16));
      dispatch(commentsDataActions.pushDataPosts(postsArray.posts));
    });

    getCommentsService().then((res) => {
      dispatch(commentsDataActions.pushDataComments(res.data.comments));
    });
  }, []);

  const pagingChange = (skip) => {
    getPostsService(skip).then((res) => {
      dispatch(commentsDataActions.pushDataPosts(res.data.posts));
    });
  };

  const showCommentsHandler = (postId) => {
    getCommentsService(postId).then((res) => {
      dispatch(commentsDataActions.pushDataComments(res.data.comments));
    });
  };

  const allPosts = useSelector((state) => state.commentsData.postsData);
  const allComments = useSelector((state) => state.commentsData.commentsData);

  const addTextAreaField = useSelector((state) => state.modalShow.addModal);

  const closeHandler = () => {
    dispatch(modalShowActions.hideAddModal());

    setFieldValue({ body: "", user: { username: "" } });
  };

  const openHandler = () => {
    dispatch(modalShowActions.showAddModal());
  };

  const [fieldValue, setFieldValue] = useState({
    body: "",
    postId: Math.random(),
    user: { username: "" },
  });

  const onChangeForms = (key, value) => {
    let newObj = { ...fieldValue };
    let userInfo = { ...fieldValue.user };
    if (key === "body") {
      newObj[key] = value;
    } else {
      userInfo.username = value;
    }
    newObj.user = userInfo;
    setFieldValue(newObj);
  };

  const addComment = () => {
    addCommentsService(fieldValue);

    dispatch(
      commentsDataActions.addComment({
        ...fieldValue,
        id: Math.random().toString(),
      })
    );

    dispatch(modalShowActions.hideAddModal());
    setFieldValue({ body: "", user: { username: "" } });
  };

  const editComment = () => {
    updateCommentsService(fieldValue.id, fieldValue);
    dispatch(commentsDataActions.editComment(fieldValue));

    dispatch(modalShowActions.hideAddModal());
    setFieldValue({ body: "", user: { username: "" } });
  };

  const deleteCommentHandler = (id) => {
    deleteCommentsService(id);
    dispatch(commentsDataActions.deleteComment(id));
  };

  const editCommentHandler = (comment) => {
    dispatch(modalShowActions.showAddModal());
    setFieldValue(comment);
  };

  return (
    <>
      {allPosts.length === 0 ? (
        <h3 className={classes.loader}>Loading...</h3>
      ) : (
        <Grid
          container
          mt={2}
          sx={{ marginBottom: "1.5rem", marginLeft: "2rem" }}
        >
          <Grid item xs={5} sx={{ paddingLeft: "1.5rem" }}>
            <Box sx={{ marginTop: "1.5rem" }}>
              {allPosts.map((post) => (
                <MainAccordion
                  key={post.id}
                  post={post}
                  showCommentsHandler={showCommentsHandler}
                />
              ))}
              <AppPagination count={count} pagingChange={pagingChange} />
            </Box>
          </Grid>
          <Grid item xs={7} className={classes.commentContainer}>
            <CommentField
              open={addTextAreaField}
              closeHandler={closeHandler}
              fieldValue={fieldValue}
              onChangeForms={onChangeForms}
              addItem={addComment}
              editItem={editComment}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <MainButton
                variant="outlined"
                name="Add comment"
                className={classes.addBtn}
                icon={<AddIcon />}
                onClick={openHandler}
              />
            </Box>
            <Grid item className={classes.containerCard}>
              {allComments.map((comment, index) => (
                <MainCard
                  className={classes.cardAction}
                  key={index}
                  info={comment}
                  title="comment"
                  deleteItemHandler={deleteCommentHandler}
                  editItemHandler={editCommentHandler}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CommentContainer;
