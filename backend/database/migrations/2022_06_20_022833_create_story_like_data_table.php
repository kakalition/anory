<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up()
  {
    Schema::create('story_like_data', function (Blueprint $table) {
      $table->id();
      $table->foreignId('story_id')
        ->references('id')
        ->on('stories')
        ->cascadeOnDelete();
      $table->string('email');
      $table->integer('status');
      $table->timestamps();
    });
  }

  public function down()
  {
    Schema::dropIfExists('story_like_dislikes');
  }
};
