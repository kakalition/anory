<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('like_data', function (Blueprint $table) {
      $table->id();
      $table->foreignId('likee_id')
        ->references('id')
        ->on('users')
        ->cascadeOnDelete();
      $table->integer('status');
      $table->bigInteger('likeable_id');
      $table->string('likeable_type');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('like_data');
  }
};
