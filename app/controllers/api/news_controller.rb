module Api
    class NewsController < Api::ApplicationController
      def index
        news = News.order(created_at: :desc).limit(5)
        render json: news, status: :ok
      end
    end
end
