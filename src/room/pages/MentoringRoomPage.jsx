import React, { useState, useEffect, useRef } from 'react';
import MentoringHeader from '../components/MentoringHeader.jsx';
import VideoArea from '../components/VideoArea.jsx';
import MentoringPreparation from '../components/MentoringPreparation.jsx';

const MentoringRoomPage = () => {
    const [timer, setTimer] = useState(0);
    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [micEnabled, setMicEnabled] = useState(true);
    const [internetConnected, setInternetConnected] = useState(true);

    const localStreamRef = useRef(null);

    const setLocalStream = (stream) => {
        localStreamRef.current = stream;
    };

    const toggleCamera = () => {
        const track = localStreamRef.current?.getVideoTracks?.()[0];
        if (track) {
            track.enabled = !track.enabled;
            setCameraEnabled(track.enabled);
        }
    };

    const toggleMic = () => {
        const track = localStreamRef.current?.getAudioTracks?.()[0];
        if (track) {
            track.enabled = !track.enabled;
            setMicEnabled(track.enabled);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <MentoringHeader />
            <VideoArea
                timer={formatTime(timer)}
                cameraEnabled={cameraEnabled}
                micEnabled={micEnabled}
                setLocalStream={setLocalStream}
            />
            <MentoringPreparation
                cameraEnabled={cameraEnabled}
                micEnabled={micEnabled}
                internetConnected={internetConnected}
                toggleCamera={toggleCamera}
                toggleMic={toggleMic}
            />
        </div>
    );
};

export default MentoringRoomPage;
