// us_sender.ino - battery-powered ultrasonic sender.
// Takes 5 readings, bundles them into one LoRa packet, repeats.
// Each line is "<n>US <d>cm", where n counts up forever across packets.

#include "config.h"
#include "radio1.h"
#include <ArduinoJson.h>

// unsigned long readingNumber = 1;
unsigned long myTime = 1;

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
  char packet[251];
  packet[0] = '\0';

  JsonDocument doc;
  myTime = millis();

  doc["ms"] = myTime;
  JsonArray values = doc["values"].to<JsonArray>();

  for (int i = 0; i < READINGS_PER_PACKET; i++) {
    // char line[16];
    // snprintf(line, sizeof(line), "%luUS %dcm\n", myTime, readDistanceCm());
    // strncat(packet, line, sizeof(packet) - strlen(packet) - 1);
    values.add(readDistanceCm());
    delay(READING_INTERVAL_MS);
  }

  size_t len = serializeJson(doc, packet, sizeof(packet));

  rf95.send((uint8_t*)packet, len);
  uint8_t newline = '\n'; 
  rf95.send(&newline, 1);
  rf95.waitPacketSent(2000);

  Serial.print(packet);
  digitalWrite(LED_PIN, HIGH); delay(20); digitalWrite(LED_PIN, LOW);
}