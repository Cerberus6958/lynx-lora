# Wiring to use reciever

1. Connect RESET to Ground
2. Connect 5V to PCB power (top right of the 3x2 block header)
3. Connect GND to PCB ground (top left of 3x2 block header)
4. Connect serial- arduino pin 1 to PCB J1 pin 3 (the header on the left)

# Recieving data
Data is sent over serial at 9600 baud. For me it's on /dev/tty/ACM0, but it'll probably be different for different laptops. You can quickly check by using the Arduino IDE.

# Programming
Programming it is a bit of a pain- if you need to program it let me know and I'll send over instructions.

