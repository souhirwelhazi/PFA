module.exports = {
    register: require("./register.controller"),
    login: require("./login.controller"),
    createReclamation: require("./reclamation.controller"),
    history: require("./historique.controller"),
    getUserInfos: require("./getUserProfileInfos.controller"),
    getAllReaclamation: require("./admin.controller"),
    getAllUsers: require("./admin.controller"),
    confirmation: require("./admin.controller"),
    getAlldataList: require("./getAllUsersDataList.controller"),
    delete: require("./deleteUser.controller"),
    updateUserData: require("./updateUserData.controller"),
    addUser: require("./addUser.controller"),
};
