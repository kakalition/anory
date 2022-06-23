<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up()
  {
    Schema::create('comment_like_dislikes', function (Blueprint $table) {
      $table->id();
      $table->foreignId('comment_id')
        ->references('id')
        ->on('comments')
        ->cascadeOnDelete();
      $table->string('email');
      $table->integer('status');
      $table->timestamps();
    });
  }

  public function down()
  {
    Schema::dropIfExists('comment_like_dislikes');
  }
};
