(function ($) {
	'use strict';

	var ModuleName = 'lbx_lnop';

	var Module = function (ele, options) {
		this.ele = ele;
		this.$ele = $(ele);
		this.option = options;
		this.countTime = '5000';
		this.option = options;
		this.up = '300';
		// this.$ele.append("<div class =" + this.option.button.classes + "></div>");
		this.countTime = '5000';
		this.down = '0';
		this.btn = $('.' + this.option.button.classes);
		this.changeStatus = this.option.classes.closed + ' ' + this.option.classes.opened + ' ' + this.option.classes.opening + ' ' + this.option.classes.closing;
		var _self = this;
		this.$btn.click(onBtnClick(_self));

		function displayBanner(self, action) {
			if(self.option.transition){
				if (action == 'open') {
					self.$ele
						.removeClass(self.option.changeStatus)
						.addClass(self.option.classes.opening)
						.animate({
							bottom: self.down
						}, {
								step: self.option.whenTransition,
								complete: function () {
									console.log('ee');
									self.$btn.text(self.option.button.closetxt);
									self.$ele
										.removeClass(self.option.changeStatus)
										.addClass(self.option.classes.opened)
								}
							}); //開
				} else if (action == 'close') {
					self.$ele
						.removeClass(self.option.changeStatus)
						.addClass(self.option.classes.closing)
						.animate({
							bottom: up,
						}, {
								step: self.option.whenTransition,
								complete: function () {
									self.$btn.text(self.option.button.opentxt);
									self.$btn.removeClass(self.changeStatus)
										.addClass(self.option.classesclasses.closed)
								}
							});
				} else {
					console.log('unsupported arg');
				}; //if
			}else{
				if (action === 'close') {
					self.$ele
					.css('bottom', self.up)
					.removeClass(self.changeStatus)
					.addClass(self.button.classes.closed);
					self.$btn.text(self.option.button.opentxt);
				} else {
					self.$ele
					.css('bottom', '0px')
					.removeClass(self.changeStatus)
					.addClass(self.button.classes.opened);
					self.$btn.text(self.option.button.closetxt);
				}
			}
		}//displayBanner
			
		function onBtnClick(_self) {
			return function () {
				if (_self.$ele.hasClass(_self.option.calsses.closed)) {
					displayBanner(_self, 'open')
				} else {
					displayBanner(_self, 'close')
				}; //if
			};
		}; //function

	}; //Module



	//Module.DEFAULT
	Module.DEFAULT = {
		openAtStart: true,
		autoOpenClose: false,
		autoToggle: true,
		button: {
			closetxt: "收合",
			opentxt: "展開",
			class: "btn"
		},
		classes: {
			closed: "closed",
			closing: "closing",
			opened: "opened",
			opening: "opening"
		},
		transition: true;
		countTime: 3000,
		whenTransition: function (number) {
			console.log(number)
		} //
	};



	Module.prototype.func = function () {};

	Module.prototype.func1 = function (option) {
		console.log(option);
	};

	$.fn[ModuleName] = function (methods, options) {
		return this.each(function () {
			var $this = $(this);
			var module = $this.data(ModuleName);
			var opts = null;
			if (!!module) {
				if (typeof options === 'string' && typeof options2 === 'undefined') {
					module[options]();
				} else if (typeof methods === 'string' && typeof options === 'object') {
					module[methods](options);
				} else {
					console.log('unsupported options!');
					throw 'unsupported options!';
				}
			} else {
				opts = $.extend({},
					Module.DEFAULTS,
					typeof methods === 'object' && options,
					typeof options === 'object' && options
				);
				module = new Module(this, opts);
				$this.data(ModuleName, module);
			}
		});
	};

})(jQuery);
