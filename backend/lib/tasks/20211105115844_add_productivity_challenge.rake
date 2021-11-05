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

desc 'Add 30-Days Productivity Challenge'
task add_productivity_challenge: :environment do
  user_odyssey = User.find_by(username: 'odyssey')

  category_exercise = Category.find_by(title: 'Exercise')
  category_habits = Category.find_by(title: 'Habits')
  category_creativity = Category.find_by(title: 'Creativity')
  category_mindfulness = Category.find_by(title: 'Mindfulness')
  category_productivity = Category.find_by(title: 'Productivity')

  ########################################################################

  ActiveRecord::Base.transaction do
    challenge_productivity_desc = 'Whatever you’re working on, being productive is the key to reaching your goals. But productivity doesn’t just happen – it comes from the habits you develop and the choices you make every day. Here’s a guide to developing a productivity practice that can help you feel better and accomplish more in just 30 days. Focus on doing one thing each day for the challenge – but make them all habits that become part of your daily routine.'
    challenge_productivity = Challenge.create!(category_id: category_productivity.id,
                                               name: 'Becoming more productive',
                                               description: challenge_productivity_desc,
                                               duration: 30,
                                               schedule: 'Every day for 1 month',
                                               creator_id: user_odyssey.id,
                                               color: 2,
                                               original_creator: 'Creative Market',
                                               link_to_reference: 'https://creativemarket.com/blog/how-to-become-more-productive-in-30-days-the-challenge')
    Map.create!(land: 0, challenge_id: challenge_productivity.id)

    tasks = [
      {
        description: "Write your To-Do list a day ahead of time"
      },
      {
        description: "Wake up earlier than usual"
      },
      {
        description: "Silence your phone"
      },
      {
        description: "Create a workspace you love"
      },
      {
        description: "Shop for an ergonomic chair"
      },
      {
        description: "De-clutter your workspace"
      },
      {
        description: "Play upbeat music to boost energy and simulate alertness"
      },
      {
        description: "Drink more water"
      },
      {
        description: "Keep an agenda with daily tasks"
      },
      {
        description: "Sort tasks by impact and effort"
      },
      {
        description: "Set realistic deadlines"
      },
      {
        description: "Set goals for the day, month and year"
      },
      {
        description: "Focus on one thing at a time"
      },
      {
        description: "Plan breaks"
      },
      {
        description: "Knock out your biggest task first"
      },
      {
        description: "Set high priority tasks during your 'peak hours'"
      },
      {
        description: "Work on delegating tasks"
      },
      {
        description: "Work in intervals and time yourself"
      },
      {
        description: "Outsource work to others"
      },
      {
        description: "Designate a time for answering emails and other notifications"
      },
      {
        description: "Unsubscribe from distracting emails"
      },
      {
        description: "Look for tools to improve your workflow"
      },
      {
        description: "Minimise meeting time"
      },
      {
        description: "Learn to say No"
      },
      {
        description: "Designate a break for social media"
      },
      {
        description: "Use your commute time for minor tasks such as checking and answering emails, or catching up on readings"
      },
      {
        description: "Exercise today"
      },
      {
        description: "Make a weekly list of your achievements"
      },
      {
        description: "Reward yourself"
      },
      {
        description: "Sleep at least 8 hours"
      },
    ]

    create_tasks(tasks, challenge_productivity.id)
  end
end
# rubocop:enable all
