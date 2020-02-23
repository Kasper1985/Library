<?php

namespace Authorization;

use Models\User;
use Exception;

class TokenProvider {
  private static $key = '9PN$E@e33k6nC2$e';

  /**
   * Generates a new JSON Web Token
   * @param user User data to be used for claims
   * @param expire Number of second the token will be valid in
   * @return string JSON Web Token
   */
  public static function generateToken(User $user, int $expire) {
    // Create token header as a JSON string and encode to base64
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $header = self::base64UrlEncode($header);

    // Create token payload as a JSON string and encode to base64
    $payload = json_encode([
      'sub' => $user->id,
      'iss' => 'ua-library.dx.am', 
      'iat' => time(),
      'exp' => time() + $expire,
      'name' => $user->nameFirst.' '.$user->nameLast,
      'role' => $user->role
    ]);
    $payload = self::base64UrlEncode($payload);

    // Create signature hash and encode to base64
    $signature = hash_hmac('sha256', $header.'.'.$payload, self::$key, true);
    $signature = self::base64UrlEncode($signature);

    return $header.'.'.$payload.'.'.$signature;
  }

  /**
   * Reads token from Authorization header
   * @return Array Payload of the token
   */
  public static function readToken() {
    if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
      throw new Exception('Anonym request is not allowed');
    }

    try {
      list($type, $token) = explode(' ', $_SERVER['HTTP_AUTHORIZATION']);
      if ($type != 'Bearer') {
        throw new Exception();
      }
    } catch (\Throwable $th) {
      throw new Exception('Wrong token type');
    }

    try {
      list($header, $payload, $signature) = explode('.', $token);
      if ($header == null || $payload == null || $signature == null) {
        throw new Exception();
      }
    } catch (\Throwable $th) {
      throw new Exception('Invalid token');
    }
    
    $header = base64_decode($header);
    $payload = base64_decode($payload);

    $signatureGen = self::base64UrlEncode(hash_hmac('sha256', self::base64UrlEncode($header).'.'.self::base64UrlEncode($payload), self::$key, true));
    if ($signature != $signatureGen) {
      throw new Exception('Invalid token');
    }

    if (time() >= self::getClaim($payload, 'exp')) {
      throw new Exception('Token is expired');
    }

    return $payload;
  }

  /**
   * Gets a certain claim from given payload
   * @param payload Payload from JWT
   * @param name Name of the claim
   * @return mixed Value of the claim if it was found, otherwise - null
   */
  public static function getClaim($payload, $name) {
    $payload = json_decode($payload);
    foreach ($payload as $key => $value) {
      if (strcasecmp($key, $name) == 0) {
        return $value;
      }
    }
    return null;
  }

  /**
   * Generate a base64 url encoded string
   * @param str String to be encoded
   * @return string Base64 url encoded string
   */
  private static function base64UrlEncode($str) {
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($str));
  }
}

?>