<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class MeasureExecutionTime
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
   * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
   */
  public function handle(Request $request, Closure $next)
  {
    $response = $next($request);
    $executionTime = microtime() - LARAVEL_START;

    $response->header('X-Elapsed-Time', $executionTime);

    return $response;
  }
}
