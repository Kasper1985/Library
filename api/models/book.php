<?php

namespace Models;

class Book {
    public $id;
    public $title;
    public $author;
    public $year;
    public $available;
}

class BookFilter {
    public string $title;
    public string $author;
    public $year;
    public $available;
}

?>