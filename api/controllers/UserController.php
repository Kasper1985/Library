<?php

namespace Controllers;

use Models\Token;
use Models\User;
use Logic\UserLogic;
use Controllers\Controller;
use Authorization\TokenProvider;

class UserController extends Controller {
  private $userGateway;
  private $userLogic;

  protected function initialize() {
    $this->userLogic = new UserLogic($this->db);
  }



  public function processRequest() {
    switch ($this->requestMethod) {
      /************************************ GET ************************************/
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

      /************************************ POST ************************************/
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

      /************************************ PUT ************************************/
      case 'PUT':
        $response = $this->id ? $this->updateUser($this->id) : $this->unprocessableEntityResponse();
        break;

      /************************************ DELETE ************************************/
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


  /************************************ Execution function ************************************/
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
    try {
      TokenProvider::readToken();
    } catch (\Throwable $th) {
      return $this->unauthorizedResponse(json_encode(['Access denied' => $th->getMessage()]));
    }

    $user = $this->userLogic->getUser($id);

    if (!$user) {
      return $this->notFoundResponse();
    }

    // Hide password of user
    $user->password = '*********';
    return $this->successResponse(json_encode($user, JSON_UNESCAPED_UNICODE));
  }

  /**
   * Checks user credentials and provides an access token in case of successful login
   * @return Array An access token data
   */
  private function loginUser() {
    $credentials = json_decode(file_get_contents('php://input'), true);
    if (!$this->validateCredentials($credentials)) {
      return $this->unprocessableEntityResponse();
    }

    if ($user = $this->userLogic->login($credentials['email'], $credentials['password'])) {
      $expire = 24 * 60 * 60 - 1; // 24h = 86.399s
      $access_token = TokenProvider::generateToken($user, $expire);
      return $this->successResponse(json_encode([
        'access_token' => $access_token,
        'token_type' => 'Bearer',
        'expires_in' => $expire
      ], JSON_UNESCAPED_UNICODE));
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


  /************************************ Validations functions ************************************/
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
}

?>