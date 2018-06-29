//這是一個template
// banner.js == template //true
(function ($) {
	'use strict';

	var Module = function (ele, options) {
		this.ele = ele; //this = module.this   //div.bannerbox //array
		this.$ele = $(ele);
		//div.bannerbox //array //var $this = $(this); 
		this.option = options;
	};
	//定義function都會產出一個 prototype    //Module.this ===usage.js {}

//
	//toggle
	Module.prototype.toggle = function () {
		console.log('this is a prototype function!!!');
	}; //這是一個function 51行招喚的option 定義一個funtion 
	//任何定義在prototype裡面的東西都可以取用 

	//open
	Module.prototype.open = function () {
		console.log('this is a prototype function1!!!');
	};
	//close
	Module.prototype.close = function () {
		console.log('this is a prototype function1!!!');
	};

	//transition 




	Module.DEFAULT = {
		style: 'classname',
		whenClickCallback: function () {
			console.log('whenClickCallback');
		}
	};



	var ModuleName = 'banner';
	$.fn[ModuleName] = function (methods, options) {
		//用中括號的原因是讀取ModuleName變數
		//可以放function jquery可以直接取用
		return this.each(function () {
			var $this = $(this); //$(this)的一個object
			var module = $this.data(ModuleName); //get  //undefine
			var opts = null;
			if (!!module) {
				if (typeof options === 'string' && typeof options === 'undefined') { //判斷有幾個參數
					module[options](); //[options] toggle
				} else if (typeof options === 'string' && typeof options === 'object') {
					module[options](options); //假設有兩個參數 [funtion](參數) //toggle()
				} else {
					console.log('unsupported options!');
					throw 'unsupported options!';
				} //看
			} else {
				opts = $.extend({}, Module.DEFAULTS, (typeof methods === 'object' && options), (typeof options === 'object' && options));
				module = new Module(this, opts); //最重要的地方  this banner
				// console.log('ddd' + $this)
				$this.data(ModuleName, module); //set   //$this 裡面的物件 
			}
		});
	};

})(jQuery);
