<?php

namespace Controllers;

use Models\Token;
use Gateways\UserGateway;
use Controllers\Controller;

class UserController extends Controller {
  private $userGateway;

  protected function initialize() {
    $this->userGateway = new UserGateway($this->db);
  }

  public function processRequest() {
    switch ($this->requestMethod) {
      case 'GET':
        if (isset($this->route[0])) {
          switch ($this->route[0]) {
            default:                          // GET /user/{id}
              $id = (int) $this->route[0];
              $response = $this->getUser($id);
              break;
          }
        } else {
          $response = $this->unprocessableEntityResponse();
        }
        break;

      case 'POST':
        if (isset($this->route[0])) {
          switch ($this->route[0]) {
            case 'login':                     // POST /user/login
              $response = $this->loginUser();
              break;

            default:                          // POST /user/
              $response = $this->createUser();
              break;
          }
        } else {
          $response = $this->createUser();    // POST /user
        }
        break;

      case 'PUT':
        $response = $this->id ? $this->updateUser($this->id) : $this->unprocessableEntityResponse();
        break;

      case 'DELETE':
        $response = $this->id ? $this->deleteUser($this->id) : $this->unprocessableEntityResponse();
        break;

      default:
        $response = $this->notFoundResponse();
        break;
    }

    header($response['status_code_header']);
    if ($response['body']) {
      echo $response['body'];
    }
  }

  private function getUser($id) {
    $user = $this->userGateway->find($id);
    if (!$user) {
      return $this->notFoundResponse();
    }

    return $this->successResponse(json_encode($user, JSON_UNESCAPED_UNICODE));
  }

  private function loginUser() {
    $credentials = json_decode('['.file_get_contents('php://input').']', true)[0];
    if (!$this->validateCredentials($credentials)) {
      return $this->unprocessableEntityResponse();
    }
    
    $hashedPassword = $credentials['password'];
    
    $user = $this->userGateway->loginUser($credentials['email'], $hashedPassword);
    if (!$user) {
      return $this->unauthorizedResponse(json_encode(['error' => 'Invalid credentials']));
    } else {
      return $this->successResponse(json_encode($this->generateToken($user), JSON_UNESCAPED_UNICODE));
    }
  }

  private function createUser() {
    return $this->notImplementedResponse();
  }

  private function updateUser($id) {
    return $this->notImplementedResponse();
  }

  private function deleteUser($id) {
    $result = $this->userGateway->find($id);
    if (!$result) {
      return $this->notFoundResponse();
    }

    return $this->userGateway->delete($id) ? $this->successResponse() : $this->internalServerErrorResponse();
  }


  /************* Helper functions *************/
  private function validateCredentials($credentials) {
    if (!isset($credentials['email'])) {
      return false;
    }
    if (!isset($credentials['password'])) {
      return false;
    }
    return true;
  }

  private function generateToken($user) {
    return new Token($user->id, 'JWT', 1 * 60 * 60); // Expires in 1h = 3600s
  }
}

?>