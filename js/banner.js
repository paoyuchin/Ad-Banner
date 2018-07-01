//這是一個template
(function ($) {
	"use strict";

	function displayBanner(self, action) {
		if (self.option.transition) {
			if (action === 'open') {
				self.$ele.removeClass(self.changeStatus)
					.addClass(self.option.classes.opening)
					.animate({
						bottom: self.down
					}, {
						step: self.option.whenTransition,
						complete: function () {
							console.log('down completed');
							self.$btn.text(self.option.button.closetxt);
							self.$ele
								.removeClass(self.changeStatus)
								.addClass(self.option.classes.opened)
						}
					}); //開
			} else if (action === 'close') {
				self.$ele
					.removeClass(self.changeStatus)
					.addClass(self.option.classes.closing)
					.animate({
						bottom: self.up,
					}, {
						step: self.option.whenTransition,
						complete: function () {
							console.log('up completed');
							self.$btn.text(self.option.button.opentxt);
							self.$ele
								.removeClass(self.changeStatus)
								.addClass(self.option.classes.closed);
						}
					});
			} else {
				console.log('unsupported arg');
			}
		} else {
			if (action === 'close') {
				self.$ele
					.css('bottom', self.up)
					.removeClass(self.changeStatus)
					.addClass(self.option.classes.closed);
				self.$btn.text(self.option.button.opentxt);
			} else {
				self.$ele
					.css('bottom', self.down)
					.removeClass(self.changeStatus)
					.addClass(self.option.classes.opened);
				self.$btn.text(self.option.button.closetxt);
			}
		}
	} //displayBanner;

	function onBtnClick(_self) {
		return function () {
			if (_self.$ele.hasClass(_self.option.classes.closed)) {
				displayBanner(_self, "open");
			} else {
				displayBanner(_self, "close");
			}
		}
	};
	var Module = function (ele, options) {
		//ele = 83 this
		this.countTime = "5000";
		this.down = "0px";
		this.ele = ele;
		this.$ele = $(ele); // one of $('.banner)
		this.option = options;
		this.up = "300px";
		this.$ele.append("<div class =" + this.option.button.classes + "></div>");
		this.$ele.addClass(this.option.classes.closed);
		this.$btn = $('.' + this.option.button.class);
		this.changeStatus = this.option.classes.closed + ' ' + this.option.classes.opened + ' ' + this.option.classes.opening + ' ' + this.option.classes.closing;
		var _self = this;

		this.$btn.click(onBtnClick(_self));
		if (this.option.openAtStart) {
			this.$ele
				.css("bottom", this.down)
				.removeClass(this.changeStatus)
				.addClass(this.option.classes.opened);
		};

		if (this.option.autoToggle) {
			if (typeof this.option.autoToggle === "number") {
				this.countTime = this.option.autoToggle;
			}
			setTimeout(function () {
				onBtnClick(_self)()
			}, _self.countTime);
		}

	};

	Module.DEFAULTS = {
		openAtStart: true,
		autoOpenClose: false, // open, close
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
		transition: true,
		countTime: 3000, // autoToggle
		whenTransition: function () {
			console.log("whenTransition");
		}
	};

	//定義function都會產出一個 prototy

	//toggle
	Module.prototype.toggle = function () {
		onBtnClick(this)();
	}; //這是一個function 51行招喚的option 定義一個funtion
	//任何定義在prototype裡面的東西都可以取用
	//open

	Module.prototype.open = function () {
		if (this.$ele.hasClass(this.option.classes.closed)) {
			onBtnClick(this)();
		}
	};
	//close
	Module.prototype.close = function () {
		if (this.$ele.hasClass(this.option.classes.opened)) {
			onBtnClick(this)();
		}
	};

	var ModuleName = "banner";
	$.fn[ModuleName] = function (methods, options) {
		//用中括號的原因是讀取ModuleName變數
		//可以放function jquery可以直接取用
		return this.each(function () {
			//這個function 83 this ok
			// this == one elemenet of the outer this
			var $this = $(this); // one of the outer $('.banner')
			// console.log($this); //[div.banner]
			// console.log(this); //<div class="banner">XXXXX</div>
			var module = $this.data(ModuleName); //get  //undefined
			var opts = null;
			if (!!module) {
				if (typeof methods === "string" && typeof options === "undefined") {
					//判斷有幾個參數
					module[methods](); //[options] toggle
				} else if (typeof methods === "string" && typeof options === "object") {
					module[methods](options); //假設有兩個參數 [function](參數) //toggle()
				} else {
					console.log("unsupported options!");
					throw "unsupported options!";
				}
			} else {
				opts = $.extend({},
					Module.DEFAULTS,
					typeof methods === "object" && methods,
					typeof options === "object" && options
				);
				module = new Module(this, opts); //最重要的地方  this banner
				$this.data(ModuleName, module); //set   //$this 裡面的物件
			}
		});
	};
})(jQuery);
