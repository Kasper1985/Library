<?php

namespace Gateways;

use Models\User;

class UserGateway extends Gateway {
	public function createUser($user) {
		$query = 'INSERT INTO users (name_first, name_last, email, password, gender)'.
				 'VALUES(:name_first, :name_last, :email, :password, :gender)';
		try	{
			$stmt = $this->db->prepare($query);
			$stmt->bindParam(':name_first', $user->nameFirst);
			$stmt->bindParam(':name_last', $user->nameLast);
			$stmt->bindParam(':email', $user->email);
			$stmt->bindParam(':password', $user->password);
			$stmt->bindParam(':gender', $user->gender);
			$stmt->execute();

			$user->id = $this->db->query('SELECT LAST_INSERT_ID()')->fetchColumn();
			$user->password = '';

			return $user;
		} catch (\PDOException $e) {
			exit($e->getMessage());
		}
	}

	public function registerUser($id) {
		$query = 'UPDATE users SET registered = :today WHERE id = :id';
		try {
      $date = date('Y-m-d H:i:s');
			$stmt = $this->db->prepare($query);
			$stmt->bindParam(':today', $date);
			$stmt->bindParam(':id', $id);
      $stmt->execute();
		} catch (\PDOException $e) {
			exit($e->getMessage());
		}
	}
	
	public function getUserById($id) {
		$query = 'SELECT id, name_first, name_last, email, gender, registered, password FROM users WHERE id = :id';
		try {
			$stmt = $this->db->prepare($query);
			$stmt->bindParam(':id', $id);
			$stmt->execute();
				
			$user = null;
			if ($stmt->rowCount() == 1) {
				$result = $stmt->fetchAll()[0];

				$user = new User();
				$user->id = (int) $result['id'];
				$user->nameFirst = $result['name_first'];
				$user->nameLast = $result['name_last'];
				$user->email = $result['email'];
				$user->gender = $result['gender'];
				$user->registered = new \DateTime($result['registered']);
				$user->password = $result['password'];
			}

			return $user;
		} catch (\PDOException $e) {
			exit($e->getMessage());
		}
	}

	public function getUserByEmail($email) {
		$query = 'SELECT id, name_first, name_last, email, gender, registered, password FROM users WHERE email = :email';
		try {
			$stmt = $this->db->prepare($query);
			$stmt->bindParam(':email', $email);
			$stmt->execute();

			$user = null;
			if ($stmt->rowCount() == 1) {
				$result = $stmt->fetchAll()[0];

				$user = new User();
				$user->id = (int) $result['id'];
				$user->nameFirst = $result['name_first'];
				$user->nameLast = $result['name_last'];
				$user->email = $result['email'];
				$user->gender = $result['gender'];
				$user->registered = new \DateTime($result['registered']);
				$user->password = $result['password'];
			}

			return $user;
		} catch (\PDOException $e) {
			exit($e->getMessage());
		}
	}

	public function delete($id) {
		$query = 'DELETE FROM users WHERE id = :id';
		try {
			$stmt = $this->db->prepare($query);
			$stmt->bindParam(':id', $id);
			$stmt->execute();
			$result = $stmt->fetchAll();

			return true;
		} catch (\PDOException $e) {
			exit($e->getMessage());
		}
	}
}

?>