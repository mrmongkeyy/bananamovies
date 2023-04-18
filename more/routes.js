const view = require('./view.js');
const fm = require('./fileH.js');
const showContentHandle = require('./showContentHandler');
//const showSrcReq = require('./showSrc');
module.exports = [
	{
		url:'/',
		mM:'get',
		response(req,res){
			view.go('app',req,res);
		}
	},
	{
		url:'/scripts',
		mM:'get',
		response(req,res){
			fm.do(req,res);
		}
	},
	{
		url:'/file',
		mM:'get',
		response(req,res){
			fm.do(req,res);
		}
	},
	{
		url:'/showContent',
		mM:'get',
		response(req,res){
			showContentHandle(req,res);
		}
	},
	{
	  url:'/getSrc',
	  mM:'get',
	  response(req,res){
	    showSrcReq(req,res);
	  }
	}
];
