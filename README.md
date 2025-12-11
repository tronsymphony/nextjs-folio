Portfolio for Nitya Hoyos

## Getting Started
```bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

https://robertopozzi.medium.com/have-fun-with-your-raspberry-pi-secure-your-application-with-self-signed-certificates-c8ef455a492f
https://pimylifeup.com/raspberry-pi-ssl-lets-encrypt/


https://gemini.google.com/u/1/app/25dab0b9c9a85b75?pageId=none

raspberry pi image
2024-03-12-raspios-bullseye-armhf-lite.img.xz
192.168.1.9
nitya

ssh nitya@192.168.1.18

rm -rf node_modules package-lock.json .next

cd ../..
cd var/www/html
npm install
npm run build
pm2 restart 0
npx next-sitemap


# Configuration for Dynu.com
daemon=300                       # Check every 300 seconds (5 mins)
syslog=yes                       # Log update msgs to syslog
pid=/var/run/ddclient.pid        # Record PID in file
ssl=yes                          # Use SSL for security


sudo apt update
sudo apt install ddclient

sudo nano /etc/ddclient.conf

use=web, web=checkip.dynu.com/, web-skip='192.168.1.21'  # Get IP from server
server=api.dynu.com                                    # IP update server
protocol=dyndns2
login=nityahoyos
password='k.tTb#95.Es2hTW'
casa-dev.com

sudo systemctl restart ddclient
sudo systemctl enable ddclient

sudo ddclient -daemon=0 -debug -verbose -noquiet

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

node -v

sudo apt install git

git clone https://github.com/tronsymphony/nextjs-folio.git
pm2 start index.js --name "my-node-app" --output "logs/out.log" --error "logs/err.log"
npm install

npm install -g pm2

# sudo nano /etc/nginx/sites-available/casa-dev
# sudo nano /etc/nginx/sites-available/casa-dev

sudo apt install nginx -y

# sudo nano /etc/nginx/sites-available/my-next-app
sudo nano /etc/nginx/sites-available/casa-dev

server {
    listen 80;
    server_name casa-dev.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

sudo ln -s /etc/nginx/sites-available/casa-dev /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

sudo apt update
sudo apt install certbot python3-certbot-nginx -

sudo certbot --nginx -d casa-dev.com

# npm install
# npm run build
# pm2 restart all

HEAT

# watch -n 1 "vcgencmd measure_temp; cat /sys/class/thermal/cooling_device0/cur_state"

# PM2_HOME=/home/nityahoyos/.pm2 pm2 save

# /usr/local/bin/pm2
# sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u nityahoyos --hp /home/nityahoyos

sudo nano /etc/systemd/system/nextjs.service

[Unit]
Description=Next.js App
After=network.target

[Service]
User=nityahoyos
WorkingDirectory=/home/nityahoyos/my-next-app
# This new line tells Systemd where 'node' is:
Environment=PATH=/home/nityahoyos/.nvm/versions/node/v24.12.0/bin:/usr/bin:/bin
ExecStart=/home/nityahoyos/.nvm/versions/node/v24.12.0/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target

sudo journalctl -u nextjs -f