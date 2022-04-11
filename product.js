var mongoose=require('mongoose');
var countitem= new mongoose.Schema({
	ProductId:{
		type:Number,
		required:true
	},
	Name:{
		type:String,
		required:true
	},
	Description:{
		type:String,
		required:true
	},
	Price:{
		type:Number
	}
});
module.exports = mongoose.model('Overallstack',countitem );