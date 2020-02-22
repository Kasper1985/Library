<?php

namespace Controllers;

use Models\Token;
use Models\User;
use Logic\UserLogic;
use Controllers\Controller;

class UserController extends Controller {
  private $userGateway;
  private $userLogic;

  protected function initialize() {
    $this->userLogic = new UserLogic($this->db);
  }

  public function processRequest() {
    switch ($this->requestMethod) {
      case 'GET':
        if (isset($this->route[0])) {
          switch ($this->route[0]) {
            case 'register':                  // GET /user/register/{id}
              $id = $this->route[1];
              $response = $this->registerUser($id);
              break;
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

  private function createUser() {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$this->validateUser($data)) {
      return $this->unprocessableEntityResponse();
    }

    $user = new User();
    foreach($data as $key => $value) $user->{$key} = $value;

    $user = $this->userLogic->createUser($user);
    return $this->successResponse(json_encode($user, JSON_UNESCAPED_UNICODE));
  }

  private function registerUser($id) {
    $result = $this->userLogic->registerUser($id);
    return $this->successResponse();
  }

  private function getUser($id) {

    if (($result = $this->authorize()) != null) {
      return $result;
    }

    $user = $this->userLogic->getUser($id);

    if (!$user) {
      return $this->notFoundResponse();
    }

    // Hide password of user
    $user->password = '';
    return $this->successResponse(json_encode($user, JSON_UNESCAPED_UNICODE));
  }

  private function loginUser() {
    $credentials = json_decode(file_get_contents('php://input'), true);
    if (!$this->validateCredentials($credentials)) {
      return $this->unprocessableEntityResponse();
    }

    if ($user = $this->userLogic->login($credentials['email'], $credentials['password'])) {
      return $this->successResponse(json_encode($this->generateToken($user), JSON_UNESCAPED_UNICODE));
    }

    return $this->unauthorizedResponse(json_encode(['error' => 'Invalid login or password']));
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

  private function validateUser($data) {
    if (!isset($data['nameFirst'])) {
      return false;
    }
    if (!isset($data['nameLast'])) {
      return false;
    }
    if (!isset($data['email'])) {
      return false;
    }
    if (!isset($data['password'])) {
      return false;
    }

    return true;
  }

  /**
   * Generates a JWT token based on user data
   * @param user User to be taken for generating token claims
   */
  private function generateToken($user) {
    // Create token header as a JSON string and encode to base64
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $header = $this->base64UrlEncode($header);

    // Create token payload as a JSON string and encode to base64
    $payload = json_encode(['user_id' => $user->id, 'name' => $user->nameFirst.' '.$user->nameLast, 'iat' => time(), 'role' => 'user', 'scopes' => 'book', ]);
    $payload = $this->base64UrlEncode($payload);

    // Create signature hash and encode to base64
    $signature = hash_hmac('sha256', $header.'.'.$payload, '9PN$E@e33k6nC2$e', true);
    $signature = $this->base64UrlEncode($signature);

    return new Token($header.'.'.$payload.'.'.$signature, 'bearer', 3600); // Expires in 1h = 3600s
  }

  /**
   * Generate a base64 url encoded string
   * @param str String to be encoded
   */
  private function base64UrlEncode($str) {
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($str));
  }
}

?>