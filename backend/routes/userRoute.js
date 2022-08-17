const express = require ('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthentiicatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();


router.route('/register').post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)
router.route("/me").get(isAuthentiicatedUser, getUserDetails)

router.route("/password/update").put(isAuthentiicatedUser, updatePassword)
router.route("/me/updateProfile").put(isAuthentiicatedUser, updateProfile)


router.route("/admin/users").get(isAuthentiicatedUser, authorizeRoles("admin"),getAllUser)


router.route("/admin/user/:id").get(isAuthentiicatedUser, authorizeRoles("admin"),getSingleUser)
.put(isAuthentiicatedUser, authorizeRoles("admin"),updateUserRole)
.delete(isAuthentiicatedUser, authorizeRoles("admin"),deleteUser);

module.exports = router;