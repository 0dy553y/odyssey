# frozen_string_literal: true

module Base64Helper
  def get_file_type(data_url)
    data_url.split(',')[0][/(.*?);/m, 1]
  end

  def decoded_file(data_url)
    file_type = get_file_type(data_url)
    if file_type.present?
      Base64.decode64(data_url.split(',')[1])
    else
      Base64.decode64(data_url)
    end
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
