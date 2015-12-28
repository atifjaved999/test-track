require 'twilio-ruby'

# put your own credentials here
account_sid = 'AC92bf1ab668b6e8faf88b4ed592e433ca'
auth_token = 'ea56ff514f490d1d654c5328f7d9b98c'

# set up a client to talk to the Twilio REST API
@client = Twilio::REST::Client.new account_sid, auth_token

# alternatively, you can preconfigure the client like so
Twilio.configure do |config|
  config.account_sid = account_sid
  config.auth_token = auth_token
end

# and then you can create a new client without parameters
@client = Twilio::REST::Client.new

@client.messages.create(
  from: '+1201-972-6813',
  to: '+923244009045',
  body: 'Hey there!'
)
