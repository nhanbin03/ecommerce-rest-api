# ecommerce-rest-api
Node/Express REST API to provide typical functionality found in an ecommerce website.  Users can create accounts, view products, add products to a cart, and place/view orders.

## Running the app
1. Clone the repository
```bash
git clone https://github.com/nhanbin03/ecommerce-rest-api.git
```
2. Copy the .env.template file to .env and fill in the necessary values
3. Run docker-compose
Make sure you have docker and docker-compose installed on your machine.  Run the following command to start the app:
```bash
docker compose up
```
4. The app should now be running on http://localhost:<port> where <port> is the port specified in the .env file.