# frozen_string_literal: true
# rubocop:disable all
desc 'Replace Healthy Eating challenge'
task replace_healthy_eating: :environment do
  challenge_eating = Challenge.find_by(name: 'Healthy Eating')
  challenge_eating_desc = "Want to eat more vegetables? Fuel up with fruits? Ditch added sugars and ingredients you can't pronounce? Feed your body right with 30 days of real food."
  challenge_eating.update(description: challenge_eating_desc,
                          original_creator: 'Fabulous',
                          link_to_reference: 'https://blog.thefabulous.co/30-day-clean-eating-challenge/')

  Task.find_by(challenge_id: challenge_eating.id, index: 0).update(name: 'Day 1', description: 'Clean out your fridge.')
  Task.find_by(challenge_id: challenge_eating.id, index: 1).update(name: 'Day 2', description: 'Plan your meals.')
  Task.find_by(challenge_id: challenge_eating.id, index: 2).update(name: 'Day 3', description: 'Reflect on your health goals.')
  Task.find_by(challenge_id: challenge_eating.id, index: 3).update(name: 'Day 4', description: 'Eliminate salt.')
  Task.find_by(challenge_id: challenge_eating.id, index: 4).update(name: 'Day 5', description: 'Skip the scale.')
  Task.find_by(challenge_id: challenge_eating.id, index: 5).update(name: 'Day 6', description: 'Try new leafy greens.')
  Task.find_by(challenge_id: challenge_eating.id, index: 6).update(name: 'Day 7', description: 'Try a morning smoothie.')
  Task.find_by(challenge_id: challenge_eating.id, index: 7).update(name: 'Day 8', description: 'Eliminate sugar.')
  Task.find_by(challenge_id: challenge_eating.id, index: 8).update(name: 'Day 9', description: 'Choose whole grains.')
  Task.find_by(challenge_id: challenge_eating.id, index: 9).update(name: 'Day 10', description: 'Cut processed food.')
  Task.find_by(challenge_id: challenge_eating.id, index: 10).update(name: 'Day 11', description: 'Eat a nutritious breakfast.')
  Task.find_by(challenge_id: challenge_eating.id, index: 11).update(name: 'Day 12', description: 'Mix up your protein.')
  Task.find_by(challenge_id: challenge_eating.id, index: 12).update(name: 'Day 13', description: 'Try new fresh fruits.')
  Task.find_by(challenge_id: challenge_eating.id, index: 13).update(name: 'Day 14', description: 'Eliminate soda.')
  Task.find_by(challenge_id: challenge_eating.id, index: 14).update(name: 'Day 15', description: 'Upgrade your snack game.')
  Task.find_by(challenge_id: challenge_eating.id, index: 15).update(name: 'Day 16', description: 'Grab a protein bar.')
  Task.find_by(challenge_id: challenge_eating.id, index: 16).update(name: 'Day 17', description: 'Drink water over juice.')
  Task.find_by(challenge_id: challenge_eating.id, index: 17).update(name: 'Day 18', description: 'Go veggie for the day.')
  Task.find_by(challenge_id: challenge_eating.id, index: 18).update(name: 'Day 19', description: 'Eliminate caffeine.')
  Task.find_by(challenge_id: challenge_eating.id, index: 19).update(name: 'Day 20', description: 'Eat quinoa over rice.')
  Task.find_by(challenge_id: challenge_eating.id, index: 20).update(name: 'Day 21', description: 'Eat less, but frequently.')
  Task.find_by(challenge_id: challenge_eating.id, index: 21).update(name: 'Day 22', description: 'Skip the chocolate bar.')
  Task.find_by(challenge_id: challenge_eating.id, index: 22).update(name: 'Day 23', description: 'Eliminate dairy.')
  Task.find_by(challenge_id: challenge_eating.id, index: 23).update(name: 'Day 24', description: 'Cut out bad carbs.')
  Task.find_by(challenge_id: challenge_eating.id, index: 24).update(name: 'Day 25', description: 'Eat a nutritious dessert.')
  Task.find_by(challenge_id: challenge_eating.id, index: 25).update(name: 'Day 26', description: '5 ingredients or less.')
  Task.find_by(challenge_id: challenge_eating.id, index: 26).update(name: 'Day 27', description: 'Eliminate alcohol.')
  Task.find_by(challenge_id: challenge_eating.id, index: 27).update(name: 'Day 28', description: 'Eat a balanced plate.')
  Task.find_by(challenge_id: challenge_eating.id, index: 28).update(name: 'Day 29', description: 'Stock your fridge.')
  Task.find_by(challenge_id: challenge_eating.id, index: 29).update(name: 'Day 30', description: 'Celebrate how far you’ve come!')
end
# rubocop:enable all
