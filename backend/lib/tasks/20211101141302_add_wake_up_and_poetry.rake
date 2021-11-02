# frozen_string_literal: true
# rubocop:disable all

desc 'Add Wake Up Early challenge and Poetry challenge'
task add_wake_up_and_poetry: :environment do
  user_odyssey = User.find_by(username: 'odyssey')

  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')

  ########################################################################

  ActiveRecord::Base.transaction do
    challenge_wake_up_desc = "This challenge challenges you to wake up early little by little each day until you wake up an hour earlier after 7 days. Just by waking up an hour early for a month, you are adding four 8-hour days to your month. You can use those to pursue your dreams, do what you love, have fun or go on a trip."
    challenge_wake_up = Challenge.create(category_id: category_habits.id,
                                         name: 'Wake Up Earlier',
                                         description: challenge_wake_up_desc,
                                         duration: 7,
                                         schedule: 'Every day for 1 week',
                                         creator_id: user_odyssey.id,
                                         color: 4,
                                         original_creator: 'Productive Club',
                                         link_to_reference: 'https://productiveclub.com/7-day-wake-up-early-challenge/')
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 1',
                description: "Wake up 10 minutes before your usual wake-up time.",
                index: 0)
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 2',
                description: "Wake up another 10 minutes earlier from yesterday.",
                index: 1)
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 3',
                description: "Wake up another 10 minutes earlier from yesterday.",
                index: 2)
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 4',
                description: "Wake up another 10 minutes earlier from yesterday.",
                index: 3)
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 5',
                description: "Wake up another 10 minutes earlier from yesterday.",
                index: 4)
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 6',
                description: "Wake up another 10 minutes earlier from yesterday.",
                index: 5)
    Task.create(challenge_id: challenge_wake_up.id,
                name: 'Day 7',
                description: "Congratulations, you have reached the last day of the challenge! Wake up another 10 minutes earlier from yesterday and you would have woken up a full hour earlier than you did 7 days ago.",
                index: 6)

    challenge_poetry_desc = "Get your pen ready. Grab your favorite poetry collection. Put your party hat on. The PSPOETS team has compiled a list of 30 poetry writing prompts to get your creative juices flowing."
    challenge_poetry = Challenge.create(category_id: category_creativity.id,
                                         name: 'Poetry',
                                         description: challenge_poetry_desc,
                                         duration: 30,
                                         schedule: 'Every day for 1 month',
                                         creator_id: user_odyssey.id,
                                         color: 5,
                                         original_creator: 'PSPOETS',
                                         link_to_reference: 'https://www.pspoets.com/blog/30daypoetrychallenge')
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 1',
                description: "Write a haiku about early mornings.",
                index: 0)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 2',
                description: "Where is home to you? Tell about a location or people you feel the most comfortable around. Paint a picture with words, capture what you see and feel.",
                index: 1)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 3',
                description: "Mimic a poem after one of your favorites, following punctuation and line breaks, but surrounding an original idea.",
                index: 2)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 4',
                description: "Describe a time when you were in nature and felt a connection with the earth. Write about your environment and how it moved you.",
                index: 3)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 5',
                description: "Describe your favorite pair of shoes. Tell a story about the places it’s been.",
                index: 4)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 6',
                description: "Write a poem from you pet’s perspective. If you don’t have a pet, choose your favorite animal.",
                index: 5)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 7',
                description: "Write about a place that you have traveled to that you absolutely fell in love with. Describe the place and why you enjoyed being there so much.",
                index: 6)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 8',
                description: "If love were a recipe, what would be the top 3 essential ingredients?",
                index: 7)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 9',
                description: "What is the universal meaning of Spring?",
                index: 8)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 10',
                description: "Describe a desert. What are the flavors? Does the taste remind you of something from your past?",
                index: 9)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 11',
                description: "Take the third line from your last 14 text messages sent and arrange them into a contemporary sonnet.",
                index: 10)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 12',
                description: "Write about the seasons as if they were people. How do they feel?",
                index: 11)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 13',
                description: "Pick something in your life that you are grateful for. Write about how fortunate you are to have that thing in your life and why.",
                index: 12)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 14',
                description: "Think about a time when you have harmed someone. Write them a poem apologizing.",
                index: 13)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 15',
                description: "Use vivid imagery to write about a tree in a forest. Describe what the environment feels like, the colors, the scent of the leaves.",
                index: 14)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 16',
                description: "Think about the outdoors after it rains. Place yourself in the setting and describe what it's like.",
                index: 15)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 17',
                description: "Find a friend. Write a collaborative poem that is at least 12 lines. Take turns by having one person write a line, then switch until you feel it is complete.",
                index: 16)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 18',
                description: "Listen to your favorite song and use it as a foundation of rhythm and flow to create a contemporary poem. Only write while listening to the track.",
                index: 17)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 19',
                description: "Write about a textile in your home and the character it brings to the space.",
                index: 18)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 20',
                description: "Turn your phone off for the day and every time you have an urge to check it, write a line until you feel a poem is finished.",
                index: 19)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 21',
                description: "21 Questions. Write a poem using only questions (21 to be exact) about a feeling, person, or topic you would like to know more about.",
                index: 20)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 22',
                description: "Write a poem that takes readers through a week in your life. Embrace the mundane, the excitement, and everything in between.",
                index: 21)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 23',
                description: "Choose an inanimate object. Write from its point of view. Have it questions its purpose and the meaning of existence.",
                index: 22)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 24',
                description: "Think about a person you have lost that meant a great deal to you. Try as best you can to write about what they mean to you.",
                index: 23)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 25',
                description: "Write a poem about your most vivid memory last summer. Describe as many details as possible and how you felt.",
                index: 24)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 26',
                description: "What is one thing you cannot go too long without? Write about something you cannot give up no matter how hard you try.",
                index: 25)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 27',
                description: "Observe or research a flower or plant and use it as a metaphor, or subject, of your poem.",
                index: 26)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 28',
                description: "Sit in a coffee shop and write what you see.",
                index: 27)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 29',
                description: "Who is your favorite poet? What would you tell them if you had a chance to meet them? Write a poem about what you would say.",
                index: 28)
    Task.create(challenge_id: challenge_poetry.id,
                name: 'Day 30',
                description: "Find a contest online with a specific theme or guidelines and write a poem specifically for it. ",
                index: 29)
  end
end
# rubocop:enable all
