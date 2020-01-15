<?php

namespace Models;

class Token {
	public $access_token;
	public $token_type;
	public $expires_in;
	public $refresh_token;

	public function __construct($accessToken, $tokenType, $expiresIn, $refreshToken = null) {
		$this->access_token = $accessToken;
		$this->token_type = $tokenType;
		$this->expires_in = $expiresIn;
		$this->refresh_token = $refreshToken;
	}
}

?>