# LYNX-LoRa

Welcome to UNSW LYNX Racing's official LoRa Subproject! This is currently the first iteration of the project    
Right now this works with randomly generated data every second. The data for each graph is sent to the backend and stored in separate JSON files. Obviously this will need to be changed when we have actual data getting sent straight to the backend and displayed on the frotnend instead of vice versa.

Currently we have also added a demo for an ultrasonic sensor communicaitng over Arduino and LoRa, displayed in the Ultrasonic demo tab. This wil be used on Open Day.

## How to Run

To run, simply run **npm run dev** in the frontend folder, and **npx tsx src/server/server.ts** in the backend folder and you should see the data being printed into the terminal and stored in their respective files when they are displayed on the frontend.

If you want to use your own sensor over a microcontroller, make sure to change your BAUD rate to match, as well as the port name and comment out the extra filter code inside server.ts for the numbers, and it should work.