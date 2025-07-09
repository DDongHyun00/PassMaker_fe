import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import WebRTCConnection from "./WebRTCConnection.jsx";
import { Rnd } from "react-rnd";
import React from 'react';

const VideoArea = ({ timer, cameraEnabled, micEnabled, setLocalStream }) => {
    const location = useLocation();
    const roomId = new URLSearchParams(location.search).get("roomId");

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    return (
        <div className="flex-1 bg-black relative overflow-hidden h-[calc(100vh-80px)]">
            {/* 상대방 화면 (전체 화면) */}
            <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full bg-black object-cover"
            />

            {/* 나의 화면 - 드래그 및 리사이징 가능 */}
            <Rnd
                default={{ x: 20, y: 100, width: 320, height: 240 }}
                minWidth={160}
                minHeight={120}
                bounds="parent"
                lockAspectRatio={true}
                dragHandleClassName="drag-handle"
                className="absolute z-20 rounded-xl overflow-hidden shadow-lg border-2 border-purple-500"
            >
                <div className="w-full h-full bg-black drag-handle flex items-center justify-center relative">
                    <p className="text-white text-sm absolute top-2 left-2 z-10">나의 화면</p>
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            </Rnd>

            {/* WebRTC 연결 처리 */}
            <WebRTCConnection
                roomId={roomId}
                localVideoRef={localVideoRef}
                remoteVideoRef={remoteVideoRef}
                setLocalStream={setLocalStream}
            />
        </div>
    );
};

export default VideoArea;
