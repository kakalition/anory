<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
  public function index()
  {
  }

  public function store(StoreCommentRequest $request)
  {
  }

  public function show(Comment $comment)
  {
  }

  public function like(Request $request)
  {
  }

  public function unlike(Request $request)
  {
  }

  public function dislike(Request $request)
  {
  }

  public function undislike(Request $request)
  {
  }

  public function update(UpdateCommentRequest $request, Comment $comment)
  {
  }

  public function destroy(Comment $comment)
  {
  }
}
