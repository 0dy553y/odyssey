# frozen_string_literal: true

# task_list is a list of the form { name: string, description: string }[].
# If the name parameter is omitted, then the name of the task will simply be "Day x"
def create_tasks(task_list, challenge_id)
  task_list.length.times do |i|
    task = task_list[i]
    Task.create!(challenge_id: challenge_id,
                 name: task[:name] || "Day #{i + 1}",
                 description: task[:description],
                 index: i)
  end
end

desc 'Update walking and journaling challenges to be longer'
task update_walking_and_journaling_challenges: :environment do
  user_odyssey = User.find_by(username: 'odyssey')
  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')
  ########################################################################

  old_walking_challenge = Challenge.find_by(name: 'Walking More')
  UserChallenge.where(challenge_id: old_walking_challenge.id).select do |uc|
    UserTask.where(user_challenge_id: uc.id).delete_all
    uc.delete
  end
  Task.where(challenge_id: old_walking_challenge.id).delete_all
  Map.where(challenge_id: old_walking_challenge.id).delete_all
  old_walking_challenge.delete

  challenge_walking_desc = %(
      Walking is a great way to improve or maintain your overall health. Just 30 minutes every day can increase
      cardiovascular fitness, strengthen bones, reduce excess body fat, and boost muscle power and endurance.
    ).squish
  challenge_walking = Challenge.create(category_id: category_exercise.id,
                                       name: 'Walking More',
                                       description: challenge_walking_desc,
                                       duration: 21,
                                       schedule: 'Daily',
                                       creator_id: user_odyssey.id,
                                       color: 4)
  Map.create!(land: 0, background: 1, environment_object: 2, challenge_id: challenge_walking.id)

  tasks = [
    { description: 'Go for a walk for at least 5 min today.' },
    { description: 'Go for a walk for at least 5 min today.' },
    { description: 'Go for a walk for at least 5 min today.' },
    { description: 'Go for a walk for at least 5 min today.' },
    { description: 'Go for a walk for at least 5 min today.' },
    { description: 'Go for a walk for at least 10 min today.' },
    { description: 'Go for a walk for at least 10 min today.' },
    { description: 'Go for a walk for at least 10 min today.' },
    { description: 'Go for a walk for at least 10 min today.' },
    { description: 'Go for a walk for at least 10 min today.' },
    { description: 'Go for a walk for at least 10 min today.' },
    { description: 'Go for a walk for at least 10 min today.' },
    { description: 'Go for a walk for at least 15 min today.' },
    { description: 'Go for a walk for at least 15 min today.' },
    { description: 'Go for a walk for at least 15 min today.' },
    { description: 'Go for a walk for at least 15 min today.' },
    { description: 'Go for a walk for at least 15 min today.' },
    { description: 'Go for a walk for at least 15 min today.' },
    { description: 'Go for a walk for at least 20 min today.' },
    { description: 'Go for a walk for at least 20 min today.' },
    { description: 'Go for a walk for at least 20 min today.' },
    { description: 'Go for a walk for at least 20 min today.' },
    { description: 'Go for a walk for at least 25 min today.' },
    { description: 'Go for a walk for at least 25 min today.' },
    { description: 'Go for a walk for at least 25 min today.' },
    { description: 'Go for a walk for at least 30 min today.' },
    { description: 'Go for a walk for at least 30 min today.' },
    { description: 'Go for a walk for at least 30 min today.' }
  ]
  create_tasks(tasks, challenge_walking.id)

  old_journaling_challenge = Challenge.find_by(name: 'Gratitude Journaling')
  UserChallenge.where(challenge_id: old_journaling_challenge.id).select do |uc|
    UserTask.where(user_challenge_id: uc.id).delete_all
    uc.delete
  end
  Task.where(challenge_id: old_journaling_challenge.id).delete_all
  Map.where(challenge_id: old_journaling_challenge.id).delete_all
  old_journaling_challenge.delete

  challenge_gratitude_desc = %(
      A gratitude journal encourages ourselves to pay attention to the good things in life we might otherwise take for
      granted. In that way we start to become more attuned to the everyday sources of pleasure around us.
    ).squish
  challenge_journaling = Challenge.create(category_id: category_habits.id,
                                          name: 'Gratitude Journaling',
                                          description: challenge_gratitude_desc,
                                          duration: 21,
                                          schedule: 'Daily',
                                          creator_id: user_odyssey.id,
                                          color: 6,
                                          link_to_reference: 'https://passionplanner.com/blogs/content/21-day-gratitude-challenge',
                                          original_creator: 'Deb Powers')
  Map.create!(land: 5, background: 3, environment_object: 0, challenge_id: challenge_journaling.id)
  tasks = [
    { description: 'What is your favorite way to express gratitude and why? (e.g Thank you note, act of service, gift etc)' },
    { description: 'Extend your favorite expression of gratitude to someone who has been on your mind.' },
    { description: 'Look through some old photos and choose your favorite memory. Why was that moment so special to you?' },
    { description: "Print the photo you chose in the previous task and place it somewhere you'll see every day." },
    { description: "What is the most incredible meal you've ever had?" },
    { description: 'Compliments to the chef! Write a five star review for the restaurant where you had an excellent meal. If it was homemade, send a thank you note to the person who made it.' },
    { description: 'How is your first week of the Gratitude Challenge going? What have you learned so far?' },
    { description: "Write a letter to your past self. Express your gratitude for how far you've come." },
    { description: 'Offer an ear or some advice. Share the wisdom of your past experience with someone who could use it.' },
    { description: "What is a community organization or non-profit that you're glad exists? Why?" },
    { description: "Share or forward a campaign for a cause you're passionate about." },
    { description: 'Make a list of all the people who inspire you. What qualities do you admire about them?' },
    { description: 'Unfollow any social media accounts that make you feel less than.' },
    { description: 'What has been your favorite moment of the gratitude challenge so far?' },
    { description: "What is the best compliment you've ever received?" },
    { description: 'Pay someone a compliment.' },
    { description: "Describe one mistake you're grateful that you made." },
    { description: 'Treat yourself! And forgive yourself for a past mistake.' },
    { description: 'Who is one person who has made a positive difference in your life? How have they impacted you?' },
    { description: "Reach out to a loved one. Thank them for everything they've done for you." },
    { description: 'How will you continue to carry and express gratitude beyond this challenge?' }
  ]
  create_tasks(tasks, challenge_journaling.id)
end
