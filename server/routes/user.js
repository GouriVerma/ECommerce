const {Router}=require("express");
const {handleGetUser,handleUpdateUser,handleDeleteUser,handleGetAllUsers,handleGetUserByAdmin,handleDeleteUserByAdmin,handleUpdateUserRoleByAdmin}=require("../controllers/user");
const {restrictTo}=require("../middleware/auth");
const { handleAddToCart, handleDeleteFromCart, handleUpdateItemInCart, handleGetAllCartItems } = require("../controllers/cart");

const router=Router();

router.get("/admin",restrictTo(["ADMIN"]),handleGetAllUsers); //only to admin
router.route("/admin/:id")
.get(restrictTo(["ADMIN"]),handleGetUserByAdmin) //only to admin
.put(restrictTo(["ADMIN"]),handleUpdateUserRoleByAdmin) //only to admin
.delete(restrictTo(["ADMIN"]),handleDeleteUserByAdmin); //only to admin

router.route("/cart/:id")
.get(handleGetAllCartItems)
.post(handleAddToCart)
.delete(handleDeleteFromCart)
.put(handleUpdateItemInCart);

router.route("/:id")
.get(handleGetUser)
.put(handleUpdateUser)
.delete(handleDeleteUser); 








module.exports=router;