# When searching for a virtual server by name, if name matches more than one of the specified variants, e.g.
# both wildcard name and regular expression match, the first matching variant will be chosen, in the following
# order of precedence:
#
# 1. exact name
# 2. longest wildcard name starting with an asterisk, e.g. “*.example.org”
# 3. longest wildcard name ending with an asterisk, e.g. “mail.*”
# 4. first matching regular expression (in order of appearance in a configuration file)

server {
  listen 80;
  server_name odyssey-app.com;

  location /.well-known/acme-challenge/ {
    root /var/www/certbot;
  }

  # Redirect HTTP to HTTPS
  location / {
    return 301 https://$host$request_uri;
  }
}

server {
  listen 80;
  server_name www.odyssey-app.com;

  location /.well-known/acme-challenge/ {
    root /var/www/certbot;
  }

  # Redirect www to non-www
  return 301 http://odyssey-app.com$request_uri;
}

server {
  listen 443 ssl http2;
  server_name odyssey-app.com;
  root /frontend;
  index index.html;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

  ssl_certificate /etc/letsencrypt/live/odyssey-app.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/odyssey-app.com/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  location / {
    # Pass on URL handling to react-router
    try_files $uri $uri/ /index.html;
    # Disable caching of index.html so that any changes to the React application invalidates the cache
    # Note that the React application itself is still cached
    add_header Cache-Control "no-store, no-cache, must-revalidate";
  }

  location /api/v1/ {
    proxy_pass http://odyssey-backend:8001/api/v1/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  # This block will catch static file requests, such as images
  location ~* \.(?:jpg|jpeg|gif|png|ico|xml|webp)$ {
    access_log        off;
    log_not_found     off;

    expires           30d;
    add_header        Pragma public;
    add_header        Cache-Control "public";
  }
}

server {
  listen 443 ssl http2;
  server_name www.odyssey-app.com;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

  ssl_certificate /etc/letsencrypt/live/www.odyssey-app.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/www.odyssey-app.com/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  # Redirect www to non-www
  return 301 https://odyssey-app.com$request_uri;
}

# Catch-all for unrecognised requests
server {
  listen 80 default_server;
  server_name _;
  return 444;
}
