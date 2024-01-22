import Header from "../components/header/Header";
import { Route, Routes } from "react-router-dom";
import ProductsContainer from "./productsContainer/ProductsContainer";
import UsersContainer from "./usersContainer/UsersContainer";
import CommentContainer from "./commentContainer/CommentContainer";

const ApplicationContainer = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/products" element={<ProductsContainer />} />
        <Route path="/users" element={<UsersContainer />} />
        <Route path="/posts" element={<CommentContainer />} />
      </Routes>
    </>
  );
};

export default ApplicationContainer;
