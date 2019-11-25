exports.get = function(req,res) {
    let users =model.getAllUsers()
    res.statusCode=200
    res.json({data:users});
}