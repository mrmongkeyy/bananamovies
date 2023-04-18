const iModule = require('./iModule.js');
const template = require('./template.js');
module.exports = {
	go(scene,req,res){
		res.send(template[scene]());
	}
}