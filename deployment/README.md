# Odyssey Deployment

## Certificate Generation

1. Install CertBot:
   ```sh
   $ sudo apt install certbot
   ```
1. Generate a certificate by running the following command and entering the domain of the application:
   ```sh
   $ certbot certonly --standalone -m <email> --no-eff-email --agree-tos
   ```
1. Copy the contents of this [configuration file](https://github.com/certbot/certbot/blob/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf) into `/etc/letsencrypt/options-ssl-nginx.conf`.
1. Generate `/etc/letsencrypt/ssl-dhparam.pem`:
   ```sh
   $ openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 4096
   ```

Certificate renewal will be automatically handled by the CertBot container.

## Running the Application

1. Install Docker and Docker Compose.
1. Clone this repository.
1. Run:
   ```sh
   $ cd deployment
   $ docker-compose up -d
   ```
