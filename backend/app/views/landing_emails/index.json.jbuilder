# frozen_string_literal: true

json.array! @landing_emails, partial: 'landing_emails/landing_email', as: :landing_email
