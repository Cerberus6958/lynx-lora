// us_sender.ino - battery-powered ultrasonic sender.
// Takes 5 readings, bundles them into one LoRa packet, repeats.
// Each line is "<n>US <d>cm", where n counts up forever across packets.

#include "config.h"
#include "radio1.h"

unsigned long readingNumber = 1;

int readDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long us = pulseIn(ECHO_PIN, HIGH, 30000UL);   // 0 if nothing echoes back
  return us * 0.0343 / 2;
}

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);

  Serial.begin(9600);
  Serial.println(F("ultrasonic sender"));

  if (!radioInit()) {
    Serial.println(F("radio FAULT"));
    while (1) {
      digitalWrite(LED_PIN, HIGH); delay(120);
      digitalWrite(LED_PIN, LOW);  delay(120);
    }
  }
  Serial.println(F("radio OK"));
}

void loop() {
  char packet[64];
  packet[0] = '\0';

  for (int i = 0; i < READINGS_PER_PACKET; i++) {
    char line[16];
    snprintf(line, sizeof(line), "%luUS %dcm\n", readingNumber++, readDistanceCm());
    strncat(packet, line, sizeof(packet) - strlen(packet) - 1);
    delay(READING_INTERVAL_MS);
  }

  rf95.send((uint8_t*)packet, strlen(packet) + 1);
  rf95.waitPacketSent(2000);

  Serial.print(packet);
  digitalWrite(LED_PIN, HIGH); delay(20); digitalWrite(LED_PIN, LOW);
}
