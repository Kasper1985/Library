<?php

namespace Models;

class User {
    public int $id;
    public string $nameFirst;
    public string $nameLast;
    public string $email;
    public int $gender;
    public string $password;
    public \DateTime $registered;
}

?>