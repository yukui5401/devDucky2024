/*
Code by: Ipyana Issah Mwaisekwa
*/

#include <PDM.h>

// default number of output channels
static const char channels = 1;

// default PCM output frequency
static const int frequency = 16000;

// Buffer to read samples into, each sample is 16-bits
short sampleBuffer[16000];

// Number of audio samples read
volatile int samplesRead;

// Buffer to accumulate samples before sending over serial
short transmitBuffer[4096];
int transmitBufferIndex = 0;
void onPDMdata();

void setup()
{
  Serial.begin(115200); // Use a higher baud rate for faster data transfer

  // Configure the data receive callback
  PDM.onReceive(onPDMdata);

  // Initialize PDM with:
  // - one channel (mono mode)
  // - a 16 kHz sample rate for the Arduino Nano 33 BLE Sense
  if (!PDM.begin(channels, frequency))
  {
    Serial.println("Failed to start PDM!");
    while (1)
      ;
  }
  // Optionally set the gain, defaults to 20
  PDM.setGain(80);
}

void loop()
{
  // Check if there are samples in the transmit buffer
  if (transmitBufferIndex > 0)
  {
    // Send the transmit buffer over the serial connection
    Serial.write((byte *)transmitBuffer, transmitBufferIndex * sizeof(short));

    // Clear the transmit buffer index
    transmitBufferIndex = 0;
  }
}

/**
 * Callback function to process the data from the PDM microphone.
 * NOTE: This callback is executed as part of an ISR.
 * Therefore using `Serial` to print messages inside this function isn't supported.
 */
void onPDMdata()
{
  // Query the number of available bytes
  int bytesAvailable = PDM.available();

  // Read into the sample buffer
  PDM.read(sampleBuffer, bytesAvailable);

  // 16-bit, 2 bytes per sample
  samplesRead = bytesAvailable / 2;

  // Copy the samples to the transmit buffer
  for (int i = 0; i < samplesRead; i++)
  {
    transmitBuffer[transmitBufferIndex++] = sampleBuffer[i];

    // Check if the transmit buffer is full
    if (transmitBufferIndex == sizeof(transmitBuffer) / sizeof(short))
    {
      // Send the transmit buffer over the serial connection
      Serial.write((byte *)transmitBuffer, sizeof(transmitBuffer));

      // Clear the transmit buffer index
      transmitBufferIndex = 0;
    }
  }
}