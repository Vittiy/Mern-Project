const UserModel = require('../models/user.model'),
    ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json({users})
};

module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Unknown UID : ' + req.params.id);
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('Unknown ID : ' + err);
    }).select('-password')
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Unknown UID : ' + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    bio: req.body.bio
                }
            },
            {
                new: true, upsert: true, setDefaultsOnInsert: true
            },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({message: err})
            })
    } catch (e) {
        return res.status(500).json({message: e.message})
    }
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Unknown UID : ' + req.params.id);

    try {
        await UserModel.remove({_id: req.params.id}).exec();
        res.status(200).json({message: "Successfully deleted."})
    } catch (e) {
        return res.status(500).json({message: e.message})
    }
};