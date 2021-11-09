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
    challenge_walking = Challenge.find_by(name: 'Walking More')
    challenge_walking.update!(duration: 21)
    challenge_walking.tasks.delete_all
    tasks = [
        {description: 'Go for a walk for at least 5 min today.'},
        {description: 'Go for a walk for at least 5 min today.'},
        {description: 'Go for a walk for at least 5 min today.'},
        {description: 'Go for a walk for at least 5 min today.'},
        {description: 'Go for a walk for at least 5 min today.'},
        {description: 'Go for a walk for at least 10 min today.'},
        {description: 'Go for a walk for at least 10 min today.'},
        {description: 'Go for a walk for at least 10 min today.'},
        {description: 'Go for a walk for at least 10 min today.'},
        {description: 'Go for a walk for at least 10 min today.'},
        {description: 'Go for a walk for at least 10 min today.'},
        {description: 'Go for a walk for at least 10 min today.'},
        {description: 'Go for a walk for at least 15 min today.'},
        {description: 'Go for a walk for at least 15 min today.'},
        {description: 'Go for a walk for at least 15 min today.'},
        {description: 'Go for a walk for at least 15 min today.'},
        {description: 'Go for a walk for at least 15 min today.'},
        {description: 'Go for a walk for at least 15 min today.'},
        {description: 'Go for a walk for at least 20 min today.'},
        {description: 'Go for a walk for at least 20 min today.'},
        {description: 'Go for a walk for at least 20 min today.'},
        {description: 'Go for a walk for at least 20 min today.'},
        {description: 'Go for a walk for at least 25 min today.'},
        {description: 'Go for a walk for at least 25 min today.'},
        {description: 'Go for a walk for at least 25 min today.'},
        {description: 'Go for a walk for at least 30 min today.'},
        {description: 'Go for a walk for at least 30 min today.'},
        {description: 'Go for a walk for at least 30 min today.'},
    ];
    create_tasks(tasks, challenge_walking.id)


    challenge_journaling = Challenge.find_by(name: 'Gratitude Journaling')
    challenge_journaling.update!(duration: 21, link_to_reference: 'https://passionplanner.com/blogs/content/21-day-gratitude-challenge', original_creator: 'Deb Powers')
    challenge_journaling.tasks.delete_all
    tasks = [
        {'What is your favorite way to express gratitude and why? (e.g Thank you note, act of service, gift etc)'},
        {'Extend your favorite expression of gratitude to someone who has been on your mind.'},
        {'Look through some old photos and choose your favorite memory. Why was that moment so special to you?'},
        {"Print the photo you chose in the previous task and place it somewhere you'll see every day."},
        {"What is the most incredible meal you've ever had?"},
        {"Compliments to the chef! Write a five star review for the restaurant where you had an excellent meal. If it was homemade, send a thank you note to the person who made it."},
        {"How is your first week of the Gratitude Challenge going? What have you learned so far?"},
        {"Write a letter to your past self. Express your gratitude for how far you've come."},
        {"Offer an ear or some advice. Share the wisdom of your past experience with someone who could use it."},
        {"What is a community organization or non-profit that you're glad exists? Why?"},
        {"Share or forward a campaign for a cause you're passionate about."},
        {"Make a list of all the people who inspire you. What qualities do you admire about them?"},
        {"Unfollow any social media accounts that make you feel less than."},
        {"What has been your favorite moment of the gratitude challenge so far?"},
        {"What is the best compliment you've ever received?"},
        {"Pay someone a compliment."},
        {"Describe one mistake you're grateful that you made."},
        {"Treat yourself! And forgive yourself for a past mistake."},
        {"Who is one person who has made a positive difference in your life? How have they impacted you?"},
        {"Reach out to a loved one. Thank them for everything they've done for you."},
        {"How will you continue to carry and express gratitude beyond this challenge?"},
    ]
    create_tasks(tasks, challenge_journaling.id)
end
