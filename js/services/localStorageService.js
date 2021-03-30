var localStorageService = function($log,$window) {
	this.$log = $log;
	this.$window = $window;
	
};

localStorageService.prototype.set = function(key, value) {
	this.$window.localStorage[key] = value;
};

localStorageService.prototype.get = function(key, defaultValue) {
	return this.$window.localStorage[key] || defaultValue;
};

localStorageService.prototype.setArray = function(key, value) {
	this.$window.localStorage[key] = JSON.stringify(value);
};

localStorageService.prototype.getArray = function(key) {
	if(this.$window.localStorage[key] != undefined){
		return JSON.parse(this.$window.localStorage[key]);
	}else{
		return [];
	}
};

localStorageService.prototype.setObj = function(key, value) {
	this.$window.localStorage[key] = JSON.stringify(value);
};

localStorageService.prototype.getObj = function(key) {
	if(this.$window.localStorage[key] != undefined){
		return JSON.parse(this.$window.localStorage[key]);
	}else{
		return {};
	}
};

localStorageService.prototype.removeObj = function(key) {
	if(this.$window.localStorage[key] != undefined){
		 localStorage.removeItem(key);
		 return {};
	}
};
app.service('localStorageService', localStorageService);