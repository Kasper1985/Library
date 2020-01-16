<?php

namespace Gateways;

use Models\Book;
use Gateways\Gateway;

class BookGateway extends Gateway {
	public function searchBooks($filter) {
		$query = 'SELECT id, title, author, year, available FROM books WHERE 1 '
						.'AND (:text IS NULL OR title LIKE :text) '
						.'AND (:author IS NULL OR author LIKE :author) '
						.'AND (:year IS NULL OR year = :year) '
						.'AND (:available IS NULL OR available = :available)';
		try	{
			$stmt = $this->db->prepare($query);
			$title = isset($filter['text']) ? '%'.$filter['text'].'%' : null;
			$stmt->bindParam(':text', $title);
			$author = isset($filter['author']) ? '%'.$filter['author'].'%' : null;
			$stmt->bindParam(':author', $author);
			$year = isset($filter['year']) ? $filter['year'] : null;
			$stmt->bindParam(':year', $year);
			$available = isset($filter['available']) ? $filter['available'] : null;
			$stmt->bindParam(':available', $available);
			$stmt->execute();

			$books = array();
			if ($stmt->rowCount() > 0) {
				$result = $stmt->fetchAll();
				foreach($result as $row) {
					$book = new Book();
					$book->id = $row['id'];
					$book->title = $row['title'];
					$book->author = $row['author'];
					$book->year = $row['year'] ? (int) $row['year'] : null;
					$book->available = $row['available'] == 1;
					$books[] = $book;
				}
			}

			return $books;
		} catch (\PDOException $e) {
			exit($e->getMessage());
		}
	}
}

?>