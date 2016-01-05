json.array!(@notifications) do |notification|
  json.extract! notification, :id, :name
  json.url notification_url(notification, format: :json)
end
