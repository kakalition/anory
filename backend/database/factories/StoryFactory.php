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
      'category_id' => $this->faker->numberBetween(1, 3),
      'views' => $this->faker->randomNumber(2, true),
      'likes' => $this->faker->randomNumber(2, true),
      'title' => $this->faker->sentence(4),
      'body' => $this->faker->text(400),
    ];
  }
}
