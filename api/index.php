<?php

require_once '_db.php';
require_once 'controllers/index.php';
require_once 'gateways/index.php';
require_once 'models/index.php';

use Controllers\UserController;
use Controllers\BookController;

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = preg_replace('/^(\/)?api\//', '', $uri);
$uri = explode( '/', $uri );

$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod == 'OPTIONS') {
	header('HTTP/1.1 200 OK');
	exit();
}

// Pass the request method and an id to the corresponding controller
switch ($uri[0]) {
	case 'user':
		$controller = new UserController($db, $requestMethod, array_slice($uri, 1));
		break;

	case 'book':
		$controller = new BookController($db, $requestMethod, array_slice($uri, 1));
		break;

	default:
		// If none of end points fit the requested end point return not found error.
		header('HTTP/1.1 404 Not Found');
		exit();
}

$controller->processRequest();

?>