<?php

namespace Gateways;

use Models\Book;
use Gateways\Gateway;

class BookGateway extends Gateway {
	public function searchBooks($filter) {
		$query = 'SELECT id, title, author, year, available FROM books WHERE title LIKE ifnull(:title, title) AND author LIKE ifnull(:author, author) AND year = ifnull(:year, year) AND available = ifnull(:available, available)';
		try	{
			$stmt = $this->db->prepare($query);
			$title = isset($filter['title']) ? '%'.$filter['title'].'%' : null;
			$stmt->bindParam(':title', $title);
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
					$book->year = (int) $row['year'];
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

/*
$stmt = $db->prepare("SELECT * FROM books WHERE title LIKE :text");
$text = '%'.$_GET["title"].'%';
$stmt->bindParam(':text', $text);
$stmt->execute();
$result = $stmt->fetchAll();

class Book {}
$books = array();

foreach($result as $row) {
    $b = new Book();
    $b->id = $row['id'];
    $b->title = $row['title'];
    $b->author = $row['author'];
    $b->year = $row['year'];
    $b->available = $row['available'] == 1;
    $books[] = $b;
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
echo json_encode($books, JSON_UNESCAPED_UNICODE);
*/

?>