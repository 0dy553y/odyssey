# frozen_string_literal: true
# rubocop:disable all

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

desc 'Add Earth and swimming challenge'
task add_earth_and_swimming_challenges: :environment do
  user_odyssey = User.find_by(username: 'odyssey')

  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')

  ########################################################################

  ActiveRecord::Base.transaction do
    challenge_earth_week_desc = 'The Earth Week Challenge is a 7-day challenge to help people practice sustainability through a program that is fun, holistic & easy to follow. Many people ask, “What is the most important action that an individual can take to stop climate change?” The answer to this question is - there is no silver bullet, but there are several important ways you can (1) reduce your own environmental footprint and (2) advocate for systemic change. This is not a one-time challenge, because that is not enough. Our goal is to help you build new habits that last, because everyday is Earth Day!'
    challenge_earth_week = Challenge.create!(category_id: category_habits.id,
                                               name: 'Earth Week',
                                               description: challenge_earth_week_desc,
                                               duration: 7,
                                               schedule: 'Every day for 1 week',
                                               creator_id: user_odyssey.id,
                                               color: 5,
                                               original_creator: "Before It's Too Late",
                                               link_to_reference: 'https://www.beforeitstoolate.earth/7-day-guide.html')
    Map.create!(land: 0, challenge_id: challenge_earth_week.id)

    tasks = [
      {
        description: "Don't eat meat, dairy or seafood. Eat delicious vegan meals today."
      },
      {
        description: "Carpool, use public transport, bike, walk, run and move around using greener modes of transportation."
      },
      {
        description: "Find at least three ways to conserve water at home. Learn about issues which affect our access to clean water and managing healthy rivers and oceans. "
      },
      {
        description: "Refuse, Reduce, Reuse, Repair, Re-purpose, Recycle, Rot & Restore - Practice all the Rs for a Minimal Waste Lifestyle! Say no to single use plastic straws, bags, cups or Styrofoam. Try to create as little trash as you can today."
      },
      {
        description: "Tell at least two friends or family members about what you learned this week, and recruit them to also take the Earth Week Challenge"
      },
      {
        description: "Find out which products and businesses are more sustainable, so you can support a green economy."
      },
      {
        description: "Congratulations Eco Champions! You've reached day 7 of our challenge! Spend time in nature, and rebuild your sense of connection to our Mother Earth."
      },
    ]

    create_tasks(tasks, challenge_earth_week.id)

    challenge_swimming_desc = 'This is a 3-month training programme created in collaboration with leading running coach and former world #1 duathlete, Annie Emmerson. Our aim is for you to swim 1km Comfortably in the time it takes you to run 5km or cycle 10km.'
    challenge_swimming = Challenge.create!(category_id: category_exercise.id,
                                               name: 'Swimming Your First 1k',
                                               description: challenge_swimming_desc,
                                               duration: 84,
                                               schedule: '2 times a week, for 3 months',
                                               creator_id: user_odyssey.id,
                                               color: 0,
                                               original_creator: 'Speedo',
                                               link_to_reference: 'https://fliphtml5.com/wmocs/ltar/basic')
    Map.create!(land: 0, challenge_id: challenge_swimming.id)

    tasks = [
      {
        name: "Month 1, Week 1, Session 1",
        description: "Warm Up: \n100m (easy pace)\n\nMain Set:\n8x25m (moderate pace, rest 15s after each 25m)\n2x75m (steady pace, rest 30s after each 75m)\n4x25m (moderate pace, rest 15s after each 25m)\n\nCool Down:\n50m (easy pace)"
      },
      {
        name: "Month 1, Week 1, Session 2",
        description: "Warm Up: \n4x50m (easy pace, rest 30s after each 50m)\n\nMain Set:\n8x25m (moderate pace, rest 10s after each 25m)\n2x100m (moderate pace, rest 15s after each 25m)\n\nCool Down:\n50m (easy pace)"
      },
      {
        name: "Month 1, Week 2, Session 1",
        description: "Warm Up: \n4x50m (easy pace, rest 30s after each 50m)\n\nMain Set:\n8x25m (moderate pace, rest 15s after each 25m)\n2x100m (steady pace, rest 30s after each 100m)\n4x25m (moderate pace, rest 30s after each 25m)\n\nCool Down:\n50m (easy pace)"
      },
      {
        name: "Month 1, Week 2, Session 2",
        description: "Warm Up: \n200m (easy pace)\n\nMain Set:\n4x25m (moderate pace, rest 10s after each 25m)\n4x75m (steady pace, rest 45s after each 75m)\n2x25m (steady pace, rest 40s after each 25m)\n\nCool Down:\n 100m (easy pace)"
      },
      {
        name: "Month 1, Week 3, Session 1",
        description: "Warm Up: \n100m (easy pace)\n\nMain Set:\n4x50m (with a kickboard, rest 20s after each 50m)\n2x25m (fast pace, rest 30s after each 25m)\n4x50m (moderate pace, rest 20s after each 50m)\n\nCool Down:\n 150m (easy pace)"
      },
      {
        name: "Month 1, Week 3, Session 2",
        description: "Warm Up: \n4x50m (easy pace, rest 20s after each 50m)\n4x25m (with a kickboard, rest 20s after each 25m)\n\nMain Set:\n6x25m (fast pace, rest 30s after each 25m)\n2x25m (with a kickboard, rest 20s after each 25m)\n\nCool Down:\n100m (easy pace)"
      },
      {
        name: "Month 1, Week 4, Session 1",
        description: "Warm Up: \n2x100m (easy pace, rest 20s after each 100m)\n\nMain Set:\n2x50m (swim with pullbuoy, rest 30s after each 50m)\n4x25m (with a kickboard at a moderate pace, rest 30s after each 25m)\n4x50m (moderate pace, rest 20s after each 50m)\n\nCool Down:\n200m (easy pace)"
      },
      {
        name: "Month 1, Week 4, Session 2",
        description: "Warm Up: \n250m (easy pace)\n4x50m (swim with pullbuoy, rest 30s after each 50m)\n4x25m (with a kickboard at a fast pace, rest 20s after each 25m)\n2x25m (fast pace, rest 30s after each 25m)\n\nMain Set:\n100m (swim your best effort and note the time)\n\nCool Down:\n300m very easy pace"
      },
      {
        name: "Month 2, Week 1, Session 1",
        description: "Warm Up: \n200m (easy pace)\n\nMain Set:\n6x25m (with a kickboard at a moderate pace, rest 20s after each 25m)\n4x50m (swim with pullbuoy, rest 30s after each 50m)\n2x25m (with a kickboard at a moderate pace, rest 15s after each 25m)\n6x50m (moderate pace, rest 10s after each 50m)\n\nCool Down:\n100m (easy pace)"
      },
      {
        name: "Month 2, Week 1, Session 2",
        description: "Warm Up: \n100m pullbuoy easy pace\n\nMain Set:\n4x25m (moderate pace, rest 15s after each 25m)\n200m (steady pace)\n8x25m (fast pace, rest 15s after each 25m)\n8x25m (fast pace, rest 15s after each 25m)\n200m (steady pace)\n4x25m (rest 15s after each 25m)\n\nCool Down:\n100m (easy pace)"
      },
      {
        name: "Month 2, Week 2, Session 1",
        description: "Warm Up: \n4x50m (easy pace) (rest 10s after each 50m)\n\nMain Set:\n8x25m (with a kickboard at a moderate pace, rest 20s after each 25m)\n200m (steady pace)\n4x50m (swim with pullbuoy and paddles, rest 20s after each 50m)\n\nCool Down:\n200m (easy pace)"
      },
      {
        name: "Month 2, Week 2, Session 2",
        description: "Warm Up: \n100m (easy pace)\n4x25m (with a kickboard at an easy pace, rest 20s after each 25m)\n\nMain Set:\n12x25m (alternate 1 fast, 1 easy and rest 15s after each 25m)\n200m (steady pace)\n2x100m (swim with pullbuoy and paddles, rest 20s after each 100m)\n\nCool Down:\n100m (easy pace)"
      },
      {
        name: "Month 2, Week 3, Session 1",
        description: "Warm Up: \n250m (easy pace)\n6x25m (with a kickboard, rest 15s after each 25m)\n\nMain Set:\n5x100m (swim with pullbuoy and paddles, rest 20s after each 100m)\n\nCool Down:\n100m (easy pace)"
      },
      {
        name: "Month 2, Week 3, Session 2",
        description: "Warm Up: \n4x50m (easy pace, rest 10s after each 50m)\n4x25m (with a kickboard, rest 15s after each 25m)\n4x25m (fast pace, rest 20s after each 25m)\n\nMain Set:\n200m time trial (swim as fast as you can and note down your time)\n\nCool Down:\n2x200m (swim with pullbuoy, rest 20s after each 200m)"
      },
      {
        name: "Month 2, Week 4, Session 1",
        description: "Warm Up: \n200m (swim with a pullbuoy)\n4x25m (with a kickboard at an easy pace, rest 15s after each 25m)\n\nMain Set:\n200m (steady pace)\n4x25m (fast pace, rest 15s after each 25m)\n200m (steady pace)\n4x25m (fast pace, rest 10s after each 25m)\n\nCool Down:\n100m (easy pace)"
      },
      {
        name: "Month 2, Week 4, Session 2",
        description: "Warm Up: \n300m (easy pace)\n\nMain Set:\n4x25m (fast pace, rest 20s after each 25m)\n4x25m (swim with a kickboard at a moderate pace, rest 15s after each 25m)\n200m (steady pace)\n4x25m (fast pace, rest 20s after each 25m)\n4x25m (moderate pace, rest for 15s after each 25m)\n\nCool Down:\n100m (easy pace)"
      },
      {
        name: "Month 3, Week 1, Session 1",
        description: "Warm Up: \n100m (easy pace)\n8x25m (swim with a kickboard, rest 15s after each 25m)\n\nMain Set:\n4x25m (fast pace, rest for 10s after each 25m)\n4x100m (moderate pace, rest for 20s after each 100m\n4x25m (fast pace, rest for 10s after each 25m)\n\nCool Down:\n100m (easy pace)"
      },
      {
        name: "Month 3, Week 1, Session 2",
        description: "Warm Up: \n4x50m (easy pace, rest for 10s after each 50m)\n\nMain Set:\n200m (swim with pullbuoy, rest for 30s)\n4x25m (swim with a kickboard at a fast pace, rest for 10s after each 25m)\n200m (swim with pullbuoy, rest for 30s)\n4x25m (fast pace, rest for 10s after each 25m)\n\nCool Down:\n200m (easy pace)"
      },
      {
        name: "Month 3, Week 2, Session 1",
        description: "Warm Up: \n100m (easy pace)\n4x25m (easy pace, rest 15s after each 25m)\n\nMain Set:\n2x25m (fast pace, rest for 20s after each 25m)\n3x200m (moderate pace, rest for 30s after each 200m)\n2x25m (fast pace, rest for 20s after each 25m)\n\nCool Down:\n100m (easy pace)"
      },
      {
        name: "Month 3, Week 2, Session 2",
        description: "Warm Up: \n200m (easy pace)\n8x25m (swim with a kickboard, rest 15s after each 25m)\n\nMain Set:\n400m (swim with pullbuoy and paddles at a moderate pace, rest for 20s)\n\nCool Down:\n200m (easy pace)"
      },
      {
        name: "Month 3, Week 3, Session 1",
        description: "Warm Up: \n100m (easy pace)\n4x25m (swim with a kickboard, rest 15s after each 25m)\n4x25m (fast pace, rest for 20s after each 25m)\n\nMain Set:\n2x300m (moderate pace, rest for 30s after each 300m)\n\nCool Down:\n100m (easy pace)"
      },
      {
        name: "Month 3, Week 3, Session 2",
        description: "Warm Up: \n100m (easy pace)\n8x25m (moderate pace, rest 15s after each 25m)\n\nMain Set:\n6x25m (fast pace, rest for 10s after each 25m)\n200m (swim with a pullbuoy at a steady pace)\n6x25m (fast pace, rest for 10s after each 25m)\n200m (swim with a pullbuoy at a steady pace)\n\nCool Down:\n100m (easy pace)"
      },
      {
        name: "Month 3, Week 4, Session 1",
        description: "Warm Up: \n200m (easy pace)\n2x50m (moderate pace, rest 10s after each 50m)\n\nMain Set:\n8x25m (moderate pace, rest for 10s after each 25m)\n2x100m (fast pace, rest for 30s after each 100m)\n8x25m (moderate pace, rest for 10s after each 25m)\n\nCool Down:\n200m (easy pace)"
      },
      {
        name: "Month 3, Week 4, Session 2",
        description: "Warm Up: \n2x50m (easy pace, rest for 15s after each 50m)\n4x25m (swim with a kickboard at a fast pace, rest for 20s after each 25m)\n2x25m (fast pace, rest for 20s after each 25m)\nRest for 3 minutes\n\nMain Set:\n1km time trial\n\nCool Down:\n50m (easy pace)\n\nCongratulations! You've done it! Well done!"
      },
    ]

    create_tasks(tasks, challenge_swimming.id)
  end
end
# rubocop:enable all
