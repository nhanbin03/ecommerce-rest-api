# ecommerce-rest-api
Node/Express REST API to provide typical functionality found in an ecommerce website.  Users can create accounts, view products, add products to a cart, and place/view orders.

## Running the app
- Clone the repository
```bash
git clone https://github.com/nhanbin03/ecommerce-rest-api.git
```
- Copy the `.env.template` file to `.env` and fill in the necessary values
- Run docker-compose
Make sure you have docker and docker-compose installed on your machine.  Run the following command to start the app:
```bash
docker compose up
```
- The app should now be running on `http://localhost:<port>` where `<port>` is the port specified in the .env file.