<?php

namespace Gateways;
abstract class Gateway {
    protected $db;

    public function __construct($db) {
        $this->db = $db;
    }
}

?>