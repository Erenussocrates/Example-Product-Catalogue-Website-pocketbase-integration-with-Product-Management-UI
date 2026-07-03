# Example-Product-Catalogue-Website-pocketbase-integration-with-Product-Management-UI
This is a short demo of a Product Catalogue Website together with fully working backend and Product Management.
At first, simple webpage themes are generated using mobirise, and then the pages are exported to VSCode for the implementation of custom features in javascript, CSS, HTML and bootstrap.



=====Pocketbase side=====

First, the user should download and install Pocketbase by himself. Replace the "pb_data" and "pb_migrations" folders with the one I've provided.
In case the data don't work with the newer versions, try version 0.39.0.

After you downloaded your pocketbase, go to the folder where your "pocketbase.exe" file is, run cmd in that folder, and write "pocketbase serve".
You'll need to copy and paste the address shown infront of the "Dashboard:" field to an internet browser to open your admin panel.

I have an example pocketbase admin for you which has the email "example@example.com" with password "example123".
In case if there are no collections other than "users", you should run pocketbase at least once before changing the folders I've mentioned above.



=====Product Catalogue side=====

"output" folder is the project folder of the product catalogue website.

The users in "users" collection in the pocketbase database can log in, but they don't really have much functionality other than logging in and out in this demo. All the products are saved in the "urunler" collection in the pocketbase database, and they are automatically pulled from the database to be dynamically displayed on the website. 



=====Product Management side=====

"Ürün Denetleme" folder is the project folder of the product management UI/website. 

The users in "calisanlar" collection in the pocketbase database can log in and add, remove or edit a product to the database using this UI. All the products are saved in the "urunler" collection in the pocketbase database, and they are automatically pulled from the database to be dynamically displayed on the website. 
