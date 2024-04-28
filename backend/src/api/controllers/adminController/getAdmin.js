const admin = require("../../models/admin/admin");

//get all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const allAdmins = await admin.find();

        if (!allAdmins) {
            return res.status(404).json({ msg: "admins not found" });
        }

        return res.status(201).json(allAdmins);
    } catch (err) {
        return res.status(500).json({ errorMsg: "failed to fetch admins", error: err });
    }
};
