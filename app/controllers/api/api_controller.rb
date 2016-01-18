class Api::ApiController < ApplicationController
  before_filter :set_headers
  # before_filter :is_authenticated, only: [:create_location]

  def set_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Expose-Headers'] = 'Etag'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD'
    headers['Access-Control-Allow-Headers'] = '*, x-requested-with, Content-Type, If-Modified-Since, If-None-Match'
    headers['Access-Control-Max-Age'] = '86400'
  end

  def is_authenticated
      authenticate_token || render_unauthenticated
    end
    
    def render_unauthenticated
      render :json => {:message => "Please Login first"}, status: 401
    end
    
    def authenticate_token
      @user = ::User.find_by_api_token(params[:api_token]) if params[:api_token].present?
    end

    def create_location
      # Input params are api_token, device_id
      # binding.pry
      puts params.inspect
      render :nothing => true
      # {"nofc":"126014576oFcSep0oFcSepENoFcSepfalseoFcSeptrueoFcSepoFcSepoFcSep0oFcSepoFcSepfalseoFcSep0"}
    end
end
