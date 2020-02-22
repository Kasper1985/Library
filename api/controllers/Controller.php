<?php

namespace Controllers;
abstract class Controller {
	protected $db;
	protected $requestMethod;
	protected $route;

	public function __construct($db, $requestMethod, $route) {
		$this->db = $db;
		$this->requestMethod = $requestMethod;
    $this->route = $route;
    
    $this->initialize();
	}

  abstract protected function initialize();
  abstract public function processRequest();
  
  /********************** Authorization **********************/
  protected function authorize($role = null) {
    if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
      return $this->unauthorizedResponse();
    }

    //TODO: check token
    //TODO: extract claims
    //TODO: check role

    return null;
  }



  /******************** Standard responses *******************/
  /* ====================== 200 Codes ====================== */
  protected function successResponse($body = null) {
    $response['status_code_header'] = 'HTTP/1.1 200 OK';
    $response['body'] = $body;
    return $response;
  }

  /* ====================== 400 Codes ====================== */
  protected function badRequestResponse() {
    $response['status_code_header'] = 'HTTP/1.1 400 Bad Request';
    $response['body'] = null;
    return $response;
  }

  protected function unauthorizedResponse($body = null) {
    $response['status_code_header'] = 'HTTP/1.1 401 Unauthorized';
    $response['body'] = $body;
    return $response;
  }

  protected function forbiddenResponse($body = null) {
    $response['status_code_header'] = 'HTTP/1.1 403 Forbidden';
    $response['body'] = $body;
    return $response;
  }

  protected function notFoundResponse() {
    $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
    $response['body'] = null;
    return $response;
  }

  protected function unprocessableEntityResponse($body = null) {
    $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
    $response['body'] = $body ? $body :  json_encode(['error' => 'Invalid input']);
    return $response;
  }

  /* ====================== 500 Codes ====================== */
  protected function internalServerErrorResponse() {
    $response['status_code_header'] = 'HTTP/1.1 500 Internal Server Error';
    $response['body'] = null;
    return $response;
  }

  protected function notImplementedResponse() {
    $response['status_code_header'] = 'HTTP/1.1 501 Not Implemented';
    $response['body'] = null;
    return $response;
  }

  

  
}