<?php

namespace Logic;

abstract class Logic {
    protected $db;

    public function __construct($db) {
        $this->db = $db;

        $this->initialize();
    }

    abstract protected function initialize();
}

?>