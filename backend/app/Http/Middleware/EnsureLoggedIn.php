<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureLoggedIn
{
  public function handle(Request $request, Closure $next)
  {
    if ($request->user() == null) {
      return response('Unauthorized.', 401);
    }

    return $next($request);
  }
}
