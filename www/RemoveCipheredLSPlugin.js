// Variable to check whether the database is deleted
var isDatabaseDeleted = -1;
// Override existing openDatabase to automatically provide the `key` option
var originalOpenDatabase = window.sqlitePlugin.openDatabase;
window.sqlitePlugin.openDatabase = function(options, successCallback, errorCallback) {

    return originalOpenDatabase.call(window.sqlitePlugin, options, successCallback, function() {
	    sqlitePlugin.deleteDatabase(options, function() {
		    window.sqlitePlugin.openDatabase(options, successCallback, errorCallback);
		    isDatabaseDeleted = 1;
	    }, function() {
		    errorCallback();
	    });
    });
};

function GetisDatabaseDeleted() {
	return isDatabaseDeleted;
};

module.exports = new GetisDatabaseDeleted();
