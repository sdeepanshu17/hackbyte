const User = require("../models/UserModel");
const Dept = require("../models/deptModel");


const addDept = async (req, res) => {
    const { to, amt } = req.body;
    console.log(amt);
    try {
        const deptUser = await User.findById(to);

        // const deptU = await Dept.findOne({ user: deptUser._id})
        const dept = await Dept.findOneAndUpdate({ user: deptUser._id }.dept, {
            $push: {
                to: {
                    user: req.user._id,
                    amount: amt
                }
            }
        }).populate({
            path: 'to.user',
            select: 'name email'
        }).populate(
            {
                path: 'from.user',
                select: 'name email'
            }
        )

        console.log('Dept User Depth');
        console.log(dept);

        const authUser = await User.findById({ _id: req.user._id });
        const authDept = await Dept.findOneAndUpdate({ user: authUser._id }, {
            $push: {
                from: {
                    user: to,
                    amount: amt
                }
            }
        }).populate({
            path: 'to.user',
            select: 'name email'
        }).populate(
            {
                path: 'from.user',
                select: 'name email'
            }
        )

        console.log('Auth User Depth');
        console.log(authDept);

        res.status(200);
        res.json({
            message: "Dept added successfully",
            dept,
            authDept
        })

    } catch (error) {
        res.status(400);
        res.json({
            message: error.message
        })
    }
}

// const addDept = async (req, res) => {
//     const { to, amt } = req.body;
//     console.log(amt);
//         try {
//             const deptUser = await User.find(to)
//             const dept = await Dept.findOne({ user: deptUser._id })

            


//         } catch (error) {
            
//         }

//     }

module.exports = { addDept }