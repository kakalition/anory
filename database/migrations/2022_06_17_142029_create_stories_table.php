<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up()
  {
    Schema::create('stories', function (Blueprint $table) {
      $table->id();
      $table->foreignId('author_id')
        ->references('id')
        ->on('users')
        ->cascadeOnDelete();
      $table->foreignId('category_id')
        ->references('id')
        ->on('categories')
        ->cascadeOnDelete();
      $table->integer('views');
      $table->string('title');
      $table->text('body');
      $table->timestamps();
    });
  }

  public function down()
  {
    Schema::dropIfExists('stories');
  }
};
