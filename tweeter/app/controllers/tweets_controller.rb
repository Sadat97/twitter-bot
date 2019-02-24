# frozen_string_literal: true

class TweetsController < ApplicationController
  before_action :set_tweet, only: %i[show update destroy]

  # GET /tweets
  def index
    @tweets = Tweet.all

    render json: @tweets
  end

  # GET /tweets/1
  def show
    render json: @tweet
  end

  # POST /tweets
  def create
    @tweet = Tweet.new(tweet_params)
    if @tweet.save
      render json: @tweet.new_status(@tweet.status), status: :created
    else
      render json: @tweet.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tweets/1
  def update
    if @tweet.update(tweet_params)
      render json: @tweet
    else
      render json: @tweet.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tweets/1
  def destroy
    @tweet.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_tweet
    @tweet = Tweet.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def tweet_params
    params.require(:tweet).permit(:status)
  end
end
