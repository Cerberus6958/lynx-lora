// radio1.h - RFM95W on the 328PB's SPI1, DIO0 on PC2 via pin-change interrupt.
// The 328PB has two SPI peripherals; the radio is on SPI1 so SPI0 stays free
// for the ISP header. MiniCore keeps SPI1 in its own header, and PC2 is not an
// external-interrupt pin, so RadioHead needs both a custom SPI wrapper and a
// hand-written ISR.
#pragma once
#include <SPI.h>
#include <SPI1.h>
#include <RHGenericSPI.h>
#include <RH_RF95.h>
#include "config.h"

class RHHardwareSPI1 : public RHGenericSPI {
public:
  uint8_t transfer(uint8_t data) { return SPI1.transfer(data); }
  void begin() {
    SPI1.begin();
    SPI1.setBitOrder(MSBFIRST);
    SPI1.setDataMode(SPI_MODE0);
    SPI1.setClockDivider(SPI_CLOCK_DIV8);   // 1 MHz
  }
  void end() { SPI1.end(); }
  void attachInterrupt() {}
  void detachInterrupt() {}
  // Mask our DIO0 pin-change interrupt during transfers (the ISR uses SPI too).
  void beginTransaction() { _saved = PCICR; PCICR &= ~_BV(PCIE1); }
  void endTransaction()   { PCICR = _saved; }
private:
  uint8_t _saved = 0;
};

class RH_RF95_PB : public RH_RF95 {
public:
  RH_RF95_PB(uint8_t cs, RHGenericSPI& spi) : RH_RF95(cs, RH_INVALID_PIN, spi) {}
  void onDio0Rise() { handleInterrupt(); }
};

RHHardwareSPI1 spi1;
RH_RF95_PB rf95(RFM95_CS, spi1);

ISR(PCINT1_vect) {
  if (PINC & _BV(PC2)) rf95.onDio0Rise();
}

bool radioInit() {
  pinMode(RFM95_EN, OUTPUT);  digitalWrite(RFM95_EN, HIGH);
  pinMode(RFM95_RST, OUTPUT); digitalWrite(RFM95_RST, HIGH);
  digitalWrite(RFM95_RST, LOW);  delay(10);
  digitalWrite(RFM95_RST, HIGH); delay(10);

  if (!rf95.init()) return false;
  if (rf95.spiRead(0x42) != 0x12) return false;   // SX1276 version register

  rf95.setFrequency(RF95_FREQ);
  rf95.setModemConfig(RH_RF95::Bw500Cr45Sf128);   // fastest preset
  rf95.setTxPower(TX_POWER_DBM, false);
  rf95.spiWrite(0x39, SYNC_WORD);                 // private network

  pinMode(RFM95_G0, INPUT);
  PCMSK1 |= _BV(PCINT10);
  PCIFR  |= _BV(PCIF1);
  PCICR  |= _BV(PCIE1);
  return true;
}
