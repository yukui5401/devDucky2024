const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        const btnStart = document.querySelector('button[name="record"]');
        const btnStop = document.querySelector('button[name="stop"]');
        const audio = document.querySelector('#audio');

        if (!btnStart || !btnStop || !audio) {
            console.error('One or more of btnStart, btnStop, audio are not found in DOM');
            return;
        }

        const handleStartClick = async () => {
            try {
                let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                let mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                setIsRecording(true);

                let chunks = [];
                mediaRecorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                };

                mediaRecorder.onerror = (e) => {
                    alert(e.error);
                };

                mediaRecorder.onstop = async () => {
                    setIsRecording(false);
                    let blob = new Blob(chunks, { 'type': 'audio/mpeg; codecs=mp3' });
                    // options:
                    // audio/ogg; codecs=opus
                    // audio/mpeg; codecs=mp3
                    // audio/wav; codecs=pcm

                    // Call uploadAudio to send the recorded audio to the backend
                    await uploadAudio(blob);

                    // Set the src attribute of the audio element for local playback
                    let url = URL.createObjectURL(blob);
                    audio.src = url;
                };

                btnStop.addEventListener('click', () => {
                    mediaRecorder.stop();
                });
            } catch (err) {
                console.error('Error accessing media devices.', err);
            }
        };

        const uploadAudio = async (audioBlob) => {
            try {
                const formData = new FormData();
                formData.append('audio', audioBlob);

                const response = await fetch('/record', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setData(responseData);
                    console.log('Audio uploaded successfully');
                } else {
                    console.error('Failed to upload audio');
                }
            } catch (error) {
                console.error('Error uploading audio:', error);
            }
        };

        btnStart.addEventListener('click', handleStartClick);

        // Cleanup event listeners on component unmount
        return () => {
            btnStart.removeEventListener('click', handleStartClick);
        };
    }, []);

    return (
        <div>
            <button onClick={handleStartClick}>
                Start
            </button>
        </div>
    )