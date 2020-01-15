<?php

namespace Gateways;

use Models\User;

class UserGateway extends Gateway {
	public function loginUser($email, $password) {
		$query = 'SELECT id, name_first, name_last, email, salutation FROM users WHERE email = :email AND password = :password';
		try {
			$stmt = $this->db->prepare($query);
			$stmt->bindParam(':email', $email);
			$stmt->bindParam(':password', $password);
			$stmt->execute();

			$user = null;
			if ($stmt->rowCount() == 1) {
				$result = $stmt->fetchAll()[0];

				$user = new User();
				$user->id = (int) $result['id'];
				$user->nameFirst = $result['name_first'];
				$user->nameLast = $result['name_last'];
				$user->email = $result['email'];
				$user->salutation = $result['salutation'];
			}

			return $user;
		}  catch (\PDOException $e) {
			exit($e->getMessage());
		}
	}

	public function find($id) {
		$query = 'SELECT id, name_first, name_last, email, salutation FROM users WHERE id = :id';
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
				$user->salutation = $result['salutation'];
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
			// return false;
		}
	}
}

?>