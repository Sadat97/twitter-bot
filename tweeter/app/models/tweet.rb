# frozen_string_literal: true

class Tweet < ApplicationRecord

  require 'uri'
  require 'net/http'

  def new_status(tweet_status)
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "6SV0ZUVeQ0pLhiqRgWBJ6KkDl"
      config.consumer_secret     = "G15zNTnuIcTGv2hV0eo6VOLDVvIS7o5AvJcTPkX2fJfk95L9vI"
      config.access_token        = "759911265628098560-CA9riSCbIu7QdM0U4hdzcXs1YV4FkiL"
      config.access_token_secret = "dVKK4E9FRd1mjTXjczcyBn03R10TjSyoNCfiIJakRQw8p"
    end
    client.update(tweet_status)
  end
end