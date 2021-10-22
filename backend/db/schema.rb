# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_10_22_043627) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "categories", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "challenges", force: :cascade do |t|
    t.bigint "category_id"
    t.string "name", null: false
    t.text "description"
    t.string "schedule"
    t.integer "duration", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "creator_id", default: 1, null: false
    t.integer "color", default: 0, null: false
    t.index ["category_id"], name: "index_challenges_on_category_id"
    t.index ["creator_id"], name: "index_challenges_on_creator_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.bigint "first_user_id"
    t.bigint "second_user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["first_user_id", "second_user_id"], name: "index_friendships_on_first_user_id_and_second_user_id", unique: true
    t.index ["first_user_id"], name: "index_friendships_on_first_user_id"
    t.index ["second_user_id"], name: "index_friendships_on_second_user_id"
    t.check_constraint "first_user_id < second_user_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.boolean "monday", default: false
    t.boolean "tuesday", default: false
    t.boolean "wednesday", default: false
    t.boolean "thursday", default: false
    t.boolean "friday", default: false
    t.boolean "saturday", default: false
    t.boolean "sunday", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.bigint "challenge_id"
    t.string "name", null: false
    t.text "description"
    t.integer "index", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["challenge_id", "index"], name: "index_tasks_on_challenge_id_and_index", unique: true
    t.index ["challenge_id"], name: "index_tasks_on_challenge_id"
  end

  create_table "user_challenges", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "challenge_id"
    t.datetime "started_at", default: -> { "now()" }, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "completed_at"
    t.datetime "forfeited_at"
    t.bigint "schedule_id", null: false
    t.index ["challenge_id"], name: "index_user_challenges_on_challenge_id"
    t.index ["schedule_id"], name: "index_user_challenges_on_schedule_id"
    t.index ["user_id"], name: "index_user_challenges_on_user_id"
  end

  create_table "user_tasks", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "user_challenge_id"
    t.bigint "task_id"
    t.datetime "scheduled_for", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "completed_at"
    t.index ["task_id"], name: "index_user_tasks_on_task_id"
    t.index ["user_challenge_id"], name: "index_user_tasks_on_user_challenge_id"
    t.index ["user_id"], name: "index_user_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "username", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "username", null: false
    t.string "display_name"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "challenges", "categories"
  add_foreign_key "challenges", "users", column: "creator_id"
  add_foreign_key "friendships", "users", column: "first_user_id"
  add_foreign_key "friendships", "users", column: "second_user_id"
  add_foreign_key "tasks", "challenges"
  add_foreign_key "user_challenges", "challenges"
  add_foreign_key "user_challenges", "schedules"
  add_foreign_key "user_challenges", "users"
  add_foreign_key "user_tasks", "tasks"
  add_foreign_key "user_tasks", "user_challenges"
  add_foreign_key "user_tasks", "users"
end
