// us_receiver.ino - listens for sender packets and prints each reading to
// serial, one line per reading, for the Java plotter to parse.
//
// Output lines look like:  1US 10cm
// Connect PD1 (J1 pin 3) to the Arduino's pin 1, with the Arduino's RESET
// jumpered to GND so it acts as a USB-serial bridge. 9600 baud.

#include "config.h"
#include "radio1.h"

void setup() {
  pinMode(LED_PIN, OUTPUT);

  Serial.begin(9600);

  if (!radioInit()) {
    Serial.println(F("radio FAULT"));
    while (1) {
      digitalWrite(LED_PIN, HIGH); delay(120);
      digitalWrite(LED_PIN, LOW);  delay(120);
    }
  }
  Serial.println(F("# receiver ready"));
}

void loop() {
  if (!rf95.available()) return;

  uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);
  if (!rf95.recv(buf, &len)) return;

  buf[len] = '\0';
  Serial.print((char*)buf);      // already newline-separated lines

  digitalWrite(LED_PIN, HIGH); delay(20); digitalWrite(LED_PIN, LOW);
}
