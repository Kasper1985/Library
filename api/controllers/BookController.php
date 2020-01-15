<?php

namespace Controllers;

use Models\Book;
use Gateways\BookGateway;
use Controllers\Controller;

class BookController extends Controller {
	private $bookGateway;

	protected function initialize() {
		$this->bookGateway = new BookGateway($this->db);
	}

	public function ProcessRequest() {
		switch ($this->requestMethod) {
			case 'GET':
				$response = $this->notImplementedResponse();
				break;

			case 'POST':
				if (isset($this->route[0])) {
					switch ($this->route[0]) {
						case 'search':												// POST /book/search
							$response = $this->searchBooks();
							break;

						default:
							$response = $this->unprocessableEntityResponse();
							break;
					}
				} else {
					$response = $this->notFoundResponse();
				}
				break;

			case 'PUT':
				$response = $this->notImplementedResponse();
				break;

			case 'DELETE':
				$response = $this->notImplementedResponse();
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

	private function searchBooks() {
		$filter = json_decode('['.file_get_contents('php://input').']', true)[0];
		if (!$this->validateBooksFilter($filter)) {
			return $this->unprocessableEntityResponse();
		}

		$books = $this->bookGateway->searchBooks($filter);
		return $this->successResponse(json_encode($books, JSON_UNESCAPED_UNICODE));
	}


	/************* Helper functions *************/
	private function validateBooksFilter($filter) {
		if (!isset($filter['title'])) {
      return false;
    }
    return true;
	}
}

?>