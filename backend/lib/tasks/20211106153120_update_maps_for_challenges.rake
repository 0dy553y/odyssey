# frozen_string_literal: true

desc 'Update maps for challenges'
task update_maps_for_challenges: :environment do
  # FOR REFERENCE:
  # LAND: grass = 0, sand = 1, stone = 2, beehive = 3, cake = 4, forest = 5, pool = 6
  # BUILDING BLOCK: disc = 0, stairs = 1, cloud = 2
  # BACKGROUND: stars = 0, purple blue = 1, orange = 2, green yellow = 3
  # ENVIRONMENT OBJECT: hot air balloon red = 0, spaceship = 1, hot air balloon blue = 2
  Challenge.find_by(name: '30 films in 30 days').update(name: '30 Films in 30 Days')
  Challenge.find_by(name: 'Speedo: Make 1k Wet').update(name: 'Swimming Your First 1k')

  Challenge.find_by(name: 'A Drawing a Day').map.update!(land: 3, building_block: 0, background: 0)
  Challenge.find_by(name: 'Back to School').map.update!(land: 3, building_block: 0, background: 3)
  Challenge.find_by(name: 'Becoming More Productive').map.update!(land: 1, building_block: 0, background: 2,
                                                                  environment_object: 0)
  Challenge.find_by(name: 'CS3216').map.update!(land: 2, building_block: 0, background: 0, environment_object: 1)
  Challenge.find_by(name: 'Couch to 5k').map.update!(land: 0, building_block: 0, background: 3, environment_object: 2)
  Challenge.find_by(name: 'Earth Week').map.update!(land: 5, building_block: 2, background: 1)
  Challenge.find_by(name: 'Gratitude Journaling').map.update!(land: 1, building_block: 0, background: 0)
  Challenge.find_by(name: 'Happiness').map.update!(land: 1, building_block: 0, background: 0)
  Challenge.find_by(name: 'Healthy Eating').map.update!(land: 4, building_block: 0, background: 0,
                                                        environment_object: nil)
  Challenge.find_by(name: 'LEGO').map.update!(land: 3, building_block: 1, background: 0, environment_object: 0)
  Challenge.find_by(name: 'Meditation').map.update!(land: 2, building_block: 0, background: 1, environment_object: 2)
  Challenge.find_by(name: 'Mental Health Week').map.update!(land: 5, building_block: 0, background: 3)
  Challenge.find_by(name: 'Music Production').map.update!(land: 1, building_block: 1, background: 0)
  Challenge.find_by(name: 'Poetry').map.update!(land: 5, building_block: 0, background: 0, environment_object: 1)
  Challenge.find_by(name: 'Portrait Drawing').map.update!(land: 2, building_block: 0, background: 3,
                                                          environment_object: 2)
  Challenge.find_by(name: 'Social Media Detox').map.update!(land: 3, building_block: 0, background: 0,
                                                            environment_object: 1)
  Challenge.find_by(name: 'Squat Workout').map.update!(land: 1, building_block: 0, background: 2)
  Challenge.find_by(name: 'Starting the Year Right').map.update!(land: 0, building_block: 0, background: 2,
                                                                 environment_object: 2)
  Challenge.find_by(name: 'Swimming Your First 1k').map.update!(land: 6, building_block: 0, background: 1,
                                                                environment_object: 0)
  Challenge.find_by(name: 'Wake Up Earlier').map.update!(land: 2, building_block: 0, background: 0)
  Challenge.find_by(name: 'Your First Pull-Up').map.update!(land: 6, building_block: 0, background: 1,
                                                            environment_object: 0)
  Challenge.find_by(name: 'Music Production').map.update!(land: 0, building_block: 0, background: 0)
  Challenge.find_by(name: 'A Photo a Day').map.update!(land: 3, building_block: 0, background: 1, environment_object: 0)
  Challenge.find_by(name: 'A Film Script a Day').map.update!(land: 5, building_block: 0, background: 0,
                                                             environment_object: 1)
  Challenge.find_by(name: '30 Films in 30 Days').map.update!(land: 0, building_block: 0, background: 1,
                                                             environment_object: 1)
  Challenge.find_by(name: 'Spring Cleaning').map.update!(land: 0, building_block: 0, background: 3)
end
