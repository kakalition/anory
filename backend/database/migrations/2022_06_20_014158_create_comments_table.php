<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up()
  {
    Schema::create('comments', function (Blueprint $table) {
      $table->id();
      $table->foreignId('story_id')
        ->references('id')
        ->on('stories')
        ->cascadeOnDelete();
      $table->foreignId('commentee_id')
        ->references('id')
        ->on('users')
        ->cascadeOnDelete();
      $table->string('comment');
      $table->timestamps();
    });
  }

  public function down()
  {
    Schema::dropIfExists('comments');
  }
};
