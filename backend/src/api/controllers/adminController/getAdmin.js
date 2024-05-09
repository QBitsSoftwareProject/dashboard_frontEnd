const admin = require("../../models/admin/admin");

//get all admins
exports.getAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const Admin = await admin.findOne({ email });

        if (!Admin) {
            return res.status(404).json({ msg: "invalid email or password" });
        } else {
            if (password != Admin.password) {
                return res.status(404).json({ msg: "invalid email or password" });
            } else {
                return res.status(201).json(Admin);
            }
        }

    } catch (err) {
        return res.status(500).json({ errorMsg: "failed to fetch admins", error: err });
    }
};
