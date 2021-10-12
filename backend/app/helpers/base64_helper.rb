# frozen_string_literal: true

module Base64Helper
  REGEXP = /data:(?<mimetype>.+?);base64,(?<data>.*)/

  def get_file_type(data_url)
    match = REGEXP.match(data_url)
    mimetype = match[:mimetype]
    parsed = mimetype.split('/')
    return nil if parsed.length != 2

    return parsed[1]
  end

  def decoded_file(data_url)
    match = REGEXP.match(data_url)
    Base64.decode64(match[:data])
  end

  def encoded_file_data_url(attachment)
    return nil if attachment.nil?

    mime_type = attachment.content_type
    "data:#{mime_type};base64,#{Base64.strict_encode64(attachment.download)}"
  end

  def get_blob(data_url, filename, content_type)
    ActiveStorage::Blob.create_and_upload!(
      io: StringIO.new(data_url),
      filename: filename,
      content_type: content_type
    )
  end
end
