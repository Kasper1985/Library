<?php

namespace Logic;

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
      return $this->userGateway->getUserById($key);
    } else if (is_string($key)) {
      return $this->userGateway->getUserById($id);
    } else {
      throw new Exception('Key for user search is invalid');
    }
  }

  public function login($email, $password) {
    $user = $this->userGateway->getUserByEmail($email);
    
    if ($user && password_verify($password, $user->password)) {
      return $user;
    }

    return false;
  }
}

?>