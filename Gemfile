source "https://rubygems.org"

ruby "3.3.2"

gem "rails", "~> 7.2.1"
gem "sprockets-rails"

# # Use sqlite3 as the database for Active Record
# gem "sqlite3", ">= 1.4"
# Use postgreSql
gem "pg"
# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"
gem "tzinfo-data", platforms: %i[ windows jruby ]
gem "bootsnap", require: false
gem "sassc-rails"

# Encrpyt password
gem "bcrypt", "~> 3.1.7"
gem "dotenv-rails", groups: [ :development, :test ]

# db dev: composite primary key
# gem 'composite_primary_keys'

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

group :development, :test do
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end
