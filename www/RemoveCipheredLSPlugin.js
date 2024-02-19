// Variabke to check whether the database is deleted
var now = new Date();
now.setTime(now.getTime() + 1 * 3600 * 1000);
// Override existing openDatabase to automatically provide the `key` option
var originalOpenDatabase = window.sqlitePlugin.openDatabase;
window.sqlitePlugin.openDatabase = function(options, successCallback, errorCallback) {

    return originalOpenDatabase.call(window.sqlitePlugin, options, successCallback, function() {
	    sqlitePlugin.deleteDatabase(options, function() {
		    window.sqlitePlugin.openDatabase(options, successCallback, errorCallback);
		    document.cookie = "NewDatabaseIsCreated=1; expires=" + now.toUTCString() + "; path=/";
	    }, function() {
		    errorCallback();
	    });
    });
};
