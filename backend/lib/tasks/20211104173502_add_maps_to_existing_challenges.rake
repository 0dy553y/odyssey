desc 'Add maps to existing challenges'
task add_maps_to_existing_challenges: :environment do
    Challenge.all.select do |challenge|
        Map.create(land: 0, challenge_id: challenge.id)
    end 
end
