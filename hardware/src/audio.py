import serial
import numpy as np
import wave
import struct
import argparse
import serial.tools.list_ports
import os
import datetime
import uuid
import time 
from scipy.signal import butter, lfilter

# Default values
DEFAULT_BAUD = 115200  # Match the baud rate with the Arduino code
DEFAULT_LABEL = "audio"

# Parse arguments
parser = argparse.ArgumentParser(description="Serial Audio Data Collection")
parser.add_argument('-p', '--port', dest='port', type=str, required=True, help="Serial port to connect to")
parser.add_argument('-b', '--baud', dest='baud', type=int, default=DEFAULT_BAUD, help="Baud rate (default = " + str(DEFAULT_BAUD) + ")")
parser.add_argument('-d', '--directory', dest='directory', type=str, default=".", help="Output directory for files (default =.)")
parser.add_argument('-l', '--label', dest='label', type=str, default=DEFAULT_LABEL, help="Label for files (default = " + DEFAULT_LABEL + ")")

# Print out available serial ports
print()
print("Available serial ports:")
available_ports = serial.tools.list_ports.comports()
for port, desc, hwid in sorted(available_ports):
    print(" {} : {} [{}]".format(port, desc, hwid))

# Parse arguments
args = parser.parse_args()
port = args.port
baud = args.baud
out_dir = args.directory
label = args.label

print(f"Connected to: {port} successfully")

# Configure serial port
ser = serial.Serial()
ser.port = port
ser.baudrate = baud

# Attempt to connect to the serial port
try:
    ser.open()
except Exception as e:
    print("ERROR:", e)
    exit()

# Make output directory
try:
    os.makedirs(out_dir)
except FileExistsError:
    pass

# Audio configuration
CHANNELS = 1
SAMPLE_WIDTH = 2  # 16-bit samples
SAMPLE_RATE = 16000
CHUNK_SIZE = 16000  # Number of samples to read at a time
RECORD_DURATION = 5  # Duration of each audio file in seconds

# Butterworth filter parameters
CUTOFF_LOW = 5000  # Low-pass cutoff frequency in Hz
ORDER_LOW = 4  # Low-pass filter order
CUTOFF_HIGH = 200  # High-pass cutoff frequency in Hz
ORDER_HIGH = 2  # High-pass filter order

# Noise gating parameters
NOISE_GATE_THRESHOLD = 300  # Adjust this value as needed

# Create Butterworth filters
nyquist_freq = 0.5 * SAMPLE_RATE
normalized_cutoff_low = CUTOFF_LOW / nyquist_freq
normalized_cutoff_high = CUTOFF_HIGH / nyquist_freq
b_low, a_low = butter(ORDER_LOW, normalized_cutoff_low, btype='low', analog=False)
b_high, a_high = butter(ORDER_HIGH, normalized_cutoff_high, btype='high', analog=False)

# Function to amplify the audio data
def amplify(data, gain):
    return data * gain

def main():
    buffer = []

    while True:
        # Read a chunk of audio data from the serial port
        data = ser.read(CHUNK_SIZE * SAMPLE_WIDTH)
        if not data:
            continue

        # Convert the raw data to 16-bit samples
        samples = np.frombuffer(data, dtype=np.int16)

        # Apply low-pass and high-pass filtering
        filtered_samples = lfilter(b_low, a_low, samples)
        filtered_samples = lfilter(b_high, a_high, filtered_samples)

        # Apply noise gating
        filtered_samples[np.abs(filtered_samples) < NOISE_GATE_THRESHOLD] = 0

        # Amplify the audio data
        amplified_samples = amplify(filtered_samples, 2)  # Adjust the gain as needed

        buffer.extend(amplified_samples.astype(np.int16))  # Convert to int16 before appending

        # Check if we have enough samples for a 2-second audio file
        if len(buffer) >= SAMPLE_RATE * RECORD_DURATION * CHANNELS:
            # Generate a unique filename for the audio file
            timestamp = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
            uid = str(uuid.uuid4())[-12:]
            filename = f"{label}.{uid}.{timestamp}.wav"
            audio_path = os.path.join(out_dir, filename)

            # Save the audio data to a WAV file
            buffer_array = np.asarray(buffer, dtype=np.int16)  # Convert buffer to an array of int16
            with wave.open(audio_path, "w") as wavefile:
                wavefile.setparams((CHANNELS, SAMPLE_WIDTH, SAMPLE_RATE, len(buffer_array), "NONE", "NONE"))
                wav_data = struct.pack("<" + ("h" * len(buffer_array)), *buffer_array)
                wavefile.writeframes(wav_data)

            print(f"Audio file '{audio_path}' saved.")
            buffer = []  # Clear the buffer after saving the audio file
            
            # Wait for 10 seconds
            time.sleep(10)

            # Delete the WAV file
            if os.path.exists(audio_path):
                os.remove(audio_path)
                print(f"Audio file '{audio_path}' deleted.")
            else:
                print(f"Audio file '{audio_path}' not found.")

        

if __name__ == "__main__":
    main()