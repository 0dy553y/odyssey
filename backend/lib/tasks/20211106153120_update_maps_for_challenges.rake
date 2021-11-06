# frozen_string_literal: true

desc 'Update maps for challenges'
task update_maps_for_challenges: :environment do
  # Land is currently 0 to 3 (To update if we add more)
  # finding by name in case we want the land to match the challenge in some way
  # instead of randomly assign
  Challenge.find_by(name: 'Couch to 5k').map.update!(land: 1)
  Challenge.find_by(name: 'Meditation').map.update!(land: 2)
  Challenge.find_by(name: 'Your First Pull-Up').map.update!(land: 3)
  Challenge.find_by(name: 'Music Production').map.update!(land: 0)
  Challenge.find_by(name: 'Squat Workout').map.update!(land: 1)
  Challenge.find_by(name: 'Healthy Eating').map.update!(land: 2)
  Challenge.find_by(name: 'Social Media Detox').map.update!(land: 3)
  Challenge.find_by(name: 'CS3216').map.update!(land: 0)
  Challenge.find_by(name: 'Wake Up Earlier').map.update!(land: 1)
  Challenge.find_by(name: 'Poetry').map.update!(land: 2)
  Challenge.find_by(name: 'LEGO').map.update!(land: 3)
  Challenge.find_by(name: 'Mental Health Week').map.update!(land: 1)
  Challenge.find_by(name: 'Happiness').map.update!(land: 1)
  Challenge.find_by(name: 'Starting the Year Right').map.update!(land: 1)
  Challenge.find_by(name: 'Back to School').map.update!(land: 1)
  Challenge.find_by(name: 'Becoming More Productive').map.update!(land: 1)
end
