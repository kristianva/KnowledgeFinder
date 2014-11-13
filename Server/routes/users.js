var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
	var user = new User({
		email: req.body.email,
		password: req.body.password
	});
	console.log(user);
	res.send(200);
});

module.exports = router;
