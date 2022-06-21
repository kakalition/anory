<?php

namespace App\Service;

class ServiceResult
{
  private $content;
  private $httpStatus = null;

  public function __construct($content, int $httpStatus)
  {
    $this->content = $content;
    $this->httpStatus = $httpStatus;
  }

  public function getContent()
  {
    return $this->content;
  }

  public function getHttpStatus()
  {
    return $this->httpStatus;
  }
}
