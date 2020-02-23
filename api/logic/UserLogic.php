<?php

namespace Logic;

use Exception;

use Models\User;
use Gateways\UserGateway;
use Logic\Logic;

class UserLogic extends Logic {
  private $userGateway;

  protected function initialize() {
      $this->userGateway = new UserGateway($this->db);
  }

  public function createUser($user) {
    if (!isset($user->gender)) {
      $user->gender = 0;
    }

    $user->password = password_hash($user->password, PASSWORD_BCRYPT);
    return $this->userGateway->createUser($user);
  }

  public function registerUser($id) {
    $this->userGateway->registerUser($id);
  }

  public function getUser($key) {
    if (is_int($key)) {
      $user = $this->userGateway->getUserById($key);
    } else if (is_string($key)) {
      $user = $this->userGateway->getUserByEmail($key);
    } else {
      throw new Exception('Key for user search is invalid');
    }

    // Hide user password
    $user->password = '*********';
    return $user;
  }

  public function login($email, $password) {
    $user = $this->userGateway->getUserByEmail($email);
    
    if ($user && password_verify($password, $user->password)) {
      return $user;
    }

    return false;
  }

  public function editUser($user) {
    throw new Exception('This method is not implemented yet');
  }

  public function deleteUser($id) {
    try {
      $user = $this->userGateway->getUserById($id);
      if ($user != null) {
        $this->userGateway->deleteUser($id);
        return true;
      }
      return false;
    } catch (\Throwable $th) {
      return false;
    }
  }
}

?>