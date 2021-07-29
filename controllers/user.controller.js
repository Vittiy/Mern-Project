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

module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send('Unknown UID : ' + req.params.id);

    try {
        // add to the follower list
        await UserModel.findByIdAndUpdate(req.params.id, {
                $addToSet: {
                    following: req.body.idToFollow
                }
            }, {new: true, upsert: true},
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err.message)
            });
        // add to following list
        await UserModel.findByIdAndUpdate(req.body.idToFollow, {
                $addToSet: {followers: req.params.id}
            }, {new: true, upsert: true},
            (err, docs) => {
                //if (!err) res.status(201).json(docs);
                if (err) return res.status(400).json(err.message)
            });
    } catch (e) {
        return res.status(500).json({message: e.message})
    }
};

module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))
        return res.status(400).send('Unknown UID : ' + req.params.id);

    try {

        // add to the follower list
        await UserModel.findByIdAndUpdate(req.params.id, {
                $pull: {
                    following: req.body.idToUnFollow
                }
            }, {new: true, upsert: true},
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err.message)
            });
        // add to following list
        await UserModel.findByIdAndUpdate(req.body.idToUnFollow, {
                $pull: {followers: req.params.id}
            }, {new: true, upsert: true},
            (err, docs) => {
                //if (!err) res.status(201).json(docs);
                if (err) return res.status(400).json(err.message)
            });
    } catch (e) {
        return res.status(500).json({message: e.message})
    }
};