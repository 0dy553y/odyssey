# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_odyssey = User.create(username: 'Odyssey', display_name: 'Odyssey', password: 'password', is_system_account: true)

User.create(username: 'unclesoo', display_name: 'Uncle Soo', password: 'password')

category_exercise = Category.create(title: 'Exercise')
category_habits = Category.create(title: 'Habits')

challenge_gratitude_desc = %(
  A gratitude journal encourages ourselves to pay attention to the good things in life we might otherwise take for
  granted. In that way we start to become more attuned to the everyday sources of pleasure around us.
).squish
challenge_gratitude = Challenge.create(category_id: category_habits.id,
                                       name: 'Gratitude Journaling',
                                       description: challenge_gratitude_desc,
                                       duration: 3,
                                       schedule: 'Daily',
                                       creator_id: user_odyssey.id,
                                       color: 0,
                                       prize_name: 'Journal')
Task.create(challenge_id: challenge_gratitude.id,
            name: 'Day 1',
            description: 'Write down three things that happened today that you are grateful for.',
            index: 0)
Task.create(challenge_id: challenge_gratitude.id,
            name: 'Day 2',
            description: 'Write down two people you are grateful for, and why.',
            index: 1)
Task.create(challenge_id: challenge_gratitude.id,
            name: 'Day 3',
            description: 'Don’t complain for a day, and write about your experience.',
            index: 2)



