namespace :meet_ups do
  desc "Delete records older than 1 day"
  task delete_1_day_old: :environment do
    MeetUp.where(['date < ?', 1.day.ago]).destroy_all
  end
end
