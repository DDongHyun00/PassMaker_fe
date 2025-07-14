import React, { useRef } from "react";
import WebRTCConnection from "./WebRTCConnection.jsx";
import { useParams } from "react-router-dom";
import { Rnd } from "react-rnd";

const VideoArea = ({ timer, cameraEnabled, micEnabled, setLocalStream, userId }) => {
    const { roomId: roomIdParam } = useParams();
    const roomId = parseInt(roomIdParam);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    console.log("VideoArea 렌더링됨. userId:", userId);

    return (
        <div className="grow w-screen h-[calc(100vh-80px)] bg-black relative overflow-hidden">


        {/* 상대방 화면 (전체 배경 채움) */}
            <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="absolute top-1/2 left-1/2 w-full max-h-[30%] -translate-x-1/2 -translate-y-1/2 object-cover"
            />

            {/* 나의 화면 - 드래그 및 리사이징 가능 */}
            <Rnd
                default={{ x: 20, y: 100, width: 320, height: 180 }} // 16:9 비율
                minWidth={160}
                minHeight={90}
                bounds="parent"
                lockAspectRatio={16 / 9}
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
            {roomId && (
                <WebRTCConnection
                    roomId={roomId}
                    localVideoRef={localVideoRef}
                    remoteVideoRef={remoteVideoRef}
                    setLocalStream={setLocalStream}
                    userId={userId}
                />
            )}
        </div>
    );
};

export default VideoArea;
