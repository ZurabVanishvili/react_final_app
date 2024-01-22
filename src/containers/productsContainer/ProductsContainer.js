import { Box, Grid, List } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../../components/common/SideBar";
import { makeStyles } from "mui-styles";
import MainTable from "../../components/common/MainTable";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../redux/CategorySlice";
import { dataSliceActions } from "../../redux/ProductDataSlice";
import MainButton from "../../components/common/MainButton";
import MainModal from "../../components/common/MainModal";
import AddIcon from "@mui/icons-material/Add";
import { modalShowActions } from "../../redux/ModalShowSlice";
import {
  addProductService,
  deleteProductService,
  getProductService,
  updateProductService,
} from "../../api/services/ProductServices";

const useStyles = makeStyles(() => ({
  productContainer: {
    "&.MuiGrid-root": {},
  },
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

const ProductsContainer = () => {
  const classes = useStyles();

  const [showTable, setShowTable] = useState(false);

  const dispatch = useDispatch();
  const productCategoryName = useSelector(
    (state) => state.category.productCategory
  );
  const addShowModal = useSelector((state) => state.modalShow.addModal);
  const addCategoryModal = useSelector(
    (state) => state.modalShow.categoryModal
  );

  useEffect(() => {
    axios.get("https://dummyjson.com/products/categories").then((res) => {
      const productCategories = res.data;
      dispatch(dataSliceActions.pushProductCategory(productCategories));

      axios
        .get("https://dummyjson.com/products/category/smartphones")
        .then((res) => {
          const dataProduct = res.data.products;
          dispatch(dataSliceActions.pushDataProduct(dataProduct));
        });
    });
  }, []);

  const products = useSelector((state) => state.productData.dataProduct);
  const category = useSelector(
    (state) => state.productData.productCategoryList
  );

  const columns = [
    { field: "title", header: "Title" },
    { field: "category", header: "category" },
    { field: "price", header: "Price" },
    { field: "discountPercentage", header: "DiscountPercentage" },
    { field: "rating", header: "Rating" },
    { field: "brand", header: "Brand" },
    { field: "stock", header: "Stock" },
  ];

  // ============================================================================
  // Add Category

  const categoryColumns = [{ field: "category" }];
  const [categoryFieldValue, setCategoryFieldValue] = useState({
    category: "",
  });
  const onChangeCategoryFieldValue = (key, value) => {
    setCategoryFieldValue({ ...categoryFieldValue, [key]: value });
  };

  const addCategory = () => {
    dispatch(dataSliceActions.addCategory(categoryFieldValue.category));
    dispatch(modalShowActions.hideCategoryModal());
    setCategoryFieldValue("");
  };

  // ============================================================================

  const deleteProductHandler = (id) => {
    deleteProductService(id);
    dispatch(dataSliceActions.deleteProduct(id));
  };

  const editProductHandler = (product) => {
    dispatch(modalShowActions.showAddModal());

    setFieldValue({ ...product });
  };

  const addProduct = () => {
    addProductService(fieldValue);

    dispatch(
      dataSliceActions.addProduct({
        ...fieldValue,
        id: Math.random(),
      })
    );

    dispatch(modalShowActions.hideAddModal());
    setFieldValue({});
  };

  const editProduct = () => {
    updateProductService(fieldValue.id, fieldValue);

    dispatch(dataSliceActions.editProduct(fieldValue));

    setFieldValue({});
    dispatch(modalShowActions.hideAddModal());
  };

  const productCategory = async (product) => {
    setShowTable(true);

    dispatch(categoryActions.changeProductCategory(product));

    try {
      const response = await getProductService(product);
      const data = await response.data.products;
      dispatch(dataSliceActions.pushDataProduct(data));
    } catch (error) {
      console.log("there is an error", error.message);
    }

    setShowTable(false);
  };

  // ===================================================================
  const closeHandler = () => {
    dispatch(modalShowActions.hideAddModal());
    setFieldValue("");
  };

  const openHandler = () => {
    dispatch(modalShowActions.showAddModal());
  };

  const openCategoryModalHandler = () => {
    dispatch(modalShowActions.showCategoryModal());
  };

  const closeCategoryModalHandler = () => {
    dispatch(modalShowActions.hideCategoryModal());
    setCategoryFieldValue("");
  };
  // ===================================================================

  // change Product
  const [fieldValue, setFieldValue] = useState({
    title: "",
    price: "",
    discountPercentage: "",
    rating: "",
    brand: "",
    stock: "",
    category: "",
  });

  const onChangeForms = (key, name) => {
    fieldValue[key] = name;
  };

  return (
    <>
      {category.length === 0 ? (
        <h3 className={classes.loader}>Loading...</h3>
      ) : (
        <Grid container mt={2} className={classes.mainContainer}>
          <Grid item xs={2} className={classes.productContainer}>
            <MainButton
              variant="outlined"
              name="Add Category"
              className={classes.addBtn}
              icon={<AddIcon />}
              onClick={() => openCategoryModalHandler(true)}
            />
            <MainModal
              open={addCategoryModal}
              closeHandler={closeCategoryModalHandler}
              modalTitle="Category"
              name="Category"
              columns={categoryColumns}
              fieldValue={categoryFieldValue}
              onChangeForms={onChangeCategoryFieldValue}
              addItem={addCategory}
              editItem={editProduct}
            />
            <List className={classes.list}>
              {category.map((product, index) => (
                <SideBar
                  key={index}
                  sideBarItem={product}
                  sideBarCategory={productCategory}
                  className={classes.active}
                  categoryName={productCategoryName}
                />
              ))}
            </List>
          </Grid>
          <Grid item xs={10}>
            <MainModal
              open={addShowModal}
              closeHandler={closeHandler}
              modalTitle="product"
              name="Product"
              columns={columns}
              fieldValue={fieldValue}
              onChangeForms={onChangeForms}
              addItem={addProduct}
              editItem={editProduct}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <MainButton
                variant="outlined"
                name="Add Product"
                className={classes.addBtn}
                icon={<AddIcon />}
                onClick={() => openHandler(true)}
              />
            </Box>
            {!showTable && (
              <MainTable
                category="category"
                data={products}
                columns={columns}
                deleteItemHandler={deleteProductHandler}
                editItemHandler={editProductHandler}
                dataCategory={productCategoryName}
              />
            )}
            {showTable && <h3 className={classes.loader}>Loading...</h3>}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProductsContainer;
