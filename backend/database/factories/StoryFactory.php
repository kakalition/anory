<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Story>
 */
class StoryFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    return [
      'author_id' => 1,
      'category_id' => $this->faker->numberBetween(1, 3),
      'views' => 0,
      'title' => $this->faker->sentence(4),
      'body' => $this->faker->text(400),
    ];
  }
}
