#pragma once

#define RF95_FREQ     915.0
#define TX_POWER_DBM  5      // receiver never transmits, but init needs a value
#define SYNC_WORD     0x57   // must match the sender

// Pins (from the relay board schematic)
#define RFM95_CS   PIN_PE2
#define RFM95_EN   PIN_PD5
#define RFM95_RST  PIN_PD6
#define RFM95_G0   PIN_PC2
#define LED_PIN    PIN_PD3
