(function (global, plugin) {
	if (typeof define === 'function' && define.amd) {
		define(['can'], function (can) {
			return plugin(can || global.can);
		});
	} else if (typeof steal === 'function') {
		steal('can', function (can) {
			return plugin(can);
		});
	} else {
		plugin(global.can);
	}
}(this, function (can) {

    //Your awesome CanJS plugin goes here

	return can;
}));