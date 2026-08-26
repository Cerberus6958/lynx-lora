#pragma once

#define RF95_FREQ     915.0
#define TX_POWER_DBM  5      // low: this only needs to cross a room (2..20)
#define SYNC_WORD     0x57   // private network, ignores other LoRa traffic

#define READINGS_PER_PACKET 5
#define READING_INTERVAL_MS 200

// Pins (from the relay board schematic)
#define RFM95_CS   PIN_PE2
#define RFM95_EN   PIN_PD5
#define RFM95_RST  PIN_PD6
#define RFM95_G0   PIN_PC2
#define TRIG_PIN   PIN_PB1
#define ECHO_PIN   PIN_PB0
#define LED_PIN    PIN_PD3
