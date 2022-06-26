<?php

namespace App\Helpers;

class RouteHelper
{
  public static function formatSlug(String $slug)
  {
    return str_replace('-', ' ', $slug);
  }
}
