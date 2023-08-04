import { useEffect, useRef, useState } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "./secrets";

import { BrowserRouter, useNavigate } from "react-router-dom";
import Router from "./pages/router";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { currentUserAtom } from "./recoil/atoms";
import AuthProvider from "./pages/contexts/AuthProvider";

const supabase = createClient(SUPABASE.url, SUPABASE.apiKey);
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

let localStream: MediaStream;
let remoteStream: any;

function App() {
  // const [recoilSession, setRecoilSession] = useRecoilState(currentUserAtom);
  // const pc = new RTCPeerConnection(servers);
  // const videoRef = useRef<any>();
  // const remoteVideoRef = useRef<any>();
  // const [callId, setCallId] = useState<number>();
  // const getLocalVideo = async () => {
  //   localStream = await navigator.mediaDevices.getUserMedia({
  //     video: { width: 300 },
  //   });
  //   localStream.getTracks().forEach((track) => {
  //     console.log({ track });
  //     pc.addTrack(track, localStream);
  //   });
  //   videoRef.current.srcObject = localStream;
  //   videoRef.current.play();
  // };
  // const getRemoteVideo = async () => {
  //   remoteStream = new MediaStream();
  //   // Pull tracks from remote stream, add to video stream
  //   pc.ontrack = (event) => {
  //     event.streams[0].getTracks().forEach((track) => {
  //       remoteStream.addTrack(track);
  //     });
  //   };
  //   console.log({ remoteStream: remoteStream });
  //   remoteVideoRef.current.srcObject = remoteStream;
  // };
  // const stopVideo = () => {
  //   videoRef.current.pause();
  // };
  // const createCall = async () => {
  //   pc.onicecandidate = (event) => {
  //     event.candidate &&
  //       addData({ ...event.candidate.toJSON() }, "offerCandidates");
  //   };
  //   const offerDescription = await pc.createOffer();
  //   await pc.setLocalDescription(offerDescription);
  //   const offer = {
  //     sdp: offerDescription.sdp,
  //     type: offerDescription.type,
  //   };
  //   await addData(offer, "calls");
  // };
  // const answerCall = async () => {
  //   const { data, error } = await supabase
  //     .from("calls")
  //     .select()
  //     .eq("id", callId);
  //   if (error) {
  //     console.log("answerCallErr ", error);
  //     return;
  //   }
  //   const callData = data?.[0];
  //   const offerDescription = {
  //     sdp: callData.sdp,
  //     type: callData.type,
  //   };
  //   await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
  //   const answerDescription = await pc.createAnswer();
  //   await pc.setLocalDescription(answerDescription);
  //   const answer = {
  //     type: answerDescription.type,
  //     sdp: answerDescription.sdp,
  //   };
  //   await addData(answer, "calls");
  // };
  // const addData = async (queryData: any, tableName: string) => {
  //   const { data, error } = await supabase
  //     .from(tableName)
  //     .insert(queryData)
  //     .select();
  //   return { data, error };
  // };
  // // const getData = async (tableName: string, filterData?: any) => {
  // //   const { data, error } = await supabase
  // //     .from(tableName)
  // //     .select()
  // //     .eq("id", "3");
  // //   console.log({ data, error });
  // // };
  // // useEffect(() => {
  // //   callsChannel;
  // // }, [callsChannel]);
  // useEffect(() => {
  //   supabase
  //     .channel("table-db-changes")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "INSERT",
  //         schema: "public",
  //         table: "calls",
  //       },
  //       (payload: any) => {
  //         const data = payload.new;
  //         if (!pc.currentRemoteDescription && data?.type === "answer") {
  //           const answerDescription = new RTCSessionDescription({
  //             sdp: data.sdp,
  //             type: data.type,
  //           });
  //           pc.setRemoteDescription(answerDescription);
  //         }
  //         console.log({ payload });
  //       }
  //     )
  //     .subscribe();
  //   supabase
  //     .channel("table-db-changes")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "INSERT",
  //         schema: "public",
  //         table: "offerCandidates",
  //       },
  //       (payload) => {
  //         console.log({ payload });
  //       }
  //     )
  //     .subscribe();
  //   supabase
  //     .channel("table-db-changes")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "INSERT",
  //         schema: "public",
  //         table: "anserCandidates",
  //       },
  //       (payload) => {
  //         console.log({ payload });
  //       }
  //     )
  //     .subscribe();
  // }, []);
  // return (
  //   <div>
  //     <video ref={videoRef} />
  //     <video ref={remoteVideoRef} />
  //     <button onClick={getLocalVideo}>getLocalVideo</button>
  //     <button onClick={getRemoteVideo}>getRemoteVideo</button>
  //     <button onClick={stopVideo}>stop</button>
  //     <button onClick={() => createCall()}>createCall</button>
  //     <button onClick={() => answerCall()}>answerCall</button>
  //     <input onChange={(e) => setCallId(Number(e.target.value))} />
  //   </div>
  // );

  // useEffect(() => {
  //   console.log("hello");
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     !recoilSession && setRecoilSession(session);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     !recoilSession && setRecoilSession(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  return (
    <div className=" bg-slate-900 h-screen align-middle flex justify-center">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
