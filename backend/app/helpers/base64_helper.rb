# frozen_string_literal: true

module Base64Helper
  def get_file_type(base64_str)
    base64_str.split(',')[0][/#{'/'}(.*?)#{';'}/m, 1]
  end

  def decoded_file(base64_str)
    file_type = get_file_type(base64_str)
    if file_type.present?
      Base64.decode64(base64_str.split(',')[1])
    else
      Base64.decode64(base64_str)
    end
  end

  def encoded_str(blob)
    Base64.encode64(blob)
  end
end
