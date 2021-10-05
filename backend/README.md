# Odyssey Backend

## Getting Started

1. Install rbenv by following the instructions [here](https://github.com/rbenv/rbenv#installation).
   This will allow you to manage multiple Ruby versions on your system.
1. Install ruby-build which is available as a rbenv plugin by following the instructions [here](https://github.com/rbenv/ruby-build#installation).
1. Install the version of Ruby specified in `.ruby-version`.
   ```sh
   $ rbenv install <version>
   ```
1. Install Bundler for managing dependencies.
   ```sh
   $ gem install bundler
   ```
1. Install dependencies.
   ```sh
   $ bundle install
   ```
1. Install PostgreSQL `>= 12` by following the instructions [here](https://www.postgresql.org/download/).
1. Create and migrate the database.
   ```sh
   $ bundle exec rake db:setup
   ```
1. Start the server.
   ```sh
   $ bundle exec rails s
   ```

## Migrating Database

To apply new migrations to the database, run:
```sh
$ bundle exec rake db:migrate
```

If the state of your database is out of sync, you can drop it and recreate it as such:
```sh
bundle exec rake db:migrate:reset
```
