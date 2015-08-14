json.array!(@devices) do |device|
  json.extract! device, :id, :imei_no, :device_type, :sim_no, :user_id
  json.url device_url(device, format: :json)
end
