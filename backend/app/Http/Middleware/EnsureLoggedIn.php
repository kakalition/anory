<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureLoggedIn
{
  public function handle(Request $request, Closure $next)
  {
    if (auth()->user() == null) {
      return response('Unauthorized by middleware.', 401);
    }

    return $next($request);
  }
}
