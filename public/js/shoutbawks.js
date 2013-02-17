var Shoutbawks = function(userOptions)
{
	var self = this;

	// Default options
	this.options = {
		// The username of the current user
		'username': 'Undefined',

		// Is the current user an admin?
		'isAdmin': false,

		// The API url WITHOUT "api.php" at the end
		'apiUrl': null,

		// The element to build the shoutbox in
		'element': null
	};

	// Override the default options with the user supplied options
	for (var i in userOptions)
	{
		this.options[i] = userOptions[i];
	}

	// Our messages
	this.messages = {};

	// Initialize the variables for our elements
	this.$placeholder = null;
	this.$main = null;
	this.$actions = null;
	this.$chatArea = null;
	this.$sendArea = null;
	this.$sendField = null;

	// The JavaScript interval that refreshes the messages (quickRefresh)
	this.refreshInterval = null;

	// Create the placeholder element
	this.$placeholder = $('<div></div>');
	this.$placeholder.addClass('shoutbawks-placeholder');
	this.$placeholder.text('Open the shoutbox by clicking here');
	this.$placeholder.on('click', function() {
		self.load();
	});

	$(this.options.element).append(this.$placeholder);
};

/**
 * Performs an API call.
 *
 * @param   {string}  method      The method to call
 * @param   {string}  httpMethod  The HTTP method to use (GET, POST)
 * @param   {object}  args        An object of additional arguments to send
 *
 * @return  {jQuery.ajax}         The AJAX object
 */
Shoutbawks.prototype.apiCall = function(method, httpMethod, args)
{
	if (args == undefined) args = {};

	var fullUrl = this.apiUrl + '/' + encodeURIComponent(method);

	return $.ajax({
		url: fullUrl,
		data: args,
		type: httpMethod
	});
};

/**
 * Opens the shoutbox and runs a full refresh.
 *
 * @return  {undefined}
 */
Shoutbawks.prototype.load = function()
{
	this.$placeholder.fadeOut(200);

	// The main elements
	this.$main = $('<div></div>');
	this.$main.addClass('shoutbawks');

	// The actions at the top ("close" etc.)
	this.$actions = $('<div></div>');
	this.$actions.addClass('shoutbawks-actions');

	// The chat area itself (will be filled via addLine)
	this.$chatArea = $('<div></div>');
	this.$chatArea.addClass('shoutbawks-chatArea');

	// The "send" area at the bottom
	this.$sendArea = $('<div></div>');
	this.$sendArea.addClass('shoutbawks-sendArea');

	var $sendUsername = $('<div></div>');
	$sendUsername.text(this.options.username + ':');

	var $sendFieldContainer = $('<div></div>');
	$sendFieldContainer.addClass('shoutbawks-sendArea-container');

	this.$sendField = $('<input>');
	this.$sendField.attr({
		type: 'text',
	});

	$sendFieldContainer.append(this.$sendField);

	// Append the elements
	this.$main.append(this.$actions);
	this.$main.append(this.$chatArea);
	this.$main.append(this.$sendArea);
	$(this.options.element).append(this.$main);
};

Shoutbawks.prototype.unload = function()
{
	this.$main.remove();
	this.$placeholder.fadeIn(200);
};

/**
 * Perform a full chat refresh.
 *
 * @return  {undefined}
 */
Shoutbawks.prototype.fullRefresh = function()
{
	$.ajax({
		url: this.apiUrl + 'messages-all.txt',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		console.log(data);
	});
};

/**
 * Performs a quick (or "incremental") refresh
 * that fetches the latest 20 messages from the server.
 *
 * @return  {undefined}
 */
Shoutbawks.prototype.quickRefresh = function()
{
	$.ajax({
		url: this.apiUrl + 'messages-quick.txt',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		console.log(data);
	});
};

Shoutbawks.prototype.addLine = function(userId, userName, userColour, messageContent, messageTime)
{
	var $line = $('<div></div>');
	var $lineTable = $('<table></table>');

	var $lineTr = $('<tr></tr>');
	var $lineActions = $('<td></td>');
	var $lineTime = $('<td></td>');
	var $lineUser = $('<td></td>');
	var $lineMessage = $('<td></td>');

	$lineTr.append($lineActions);
	$lineTr.append($lineTime);
	$lineTr.append($lineUser);
	$lineTr.append($lineMessage);
};

Shoutbawks.prototype.clear = function()
{
	this.messages = {};
	this.$chatArea.html('');
};