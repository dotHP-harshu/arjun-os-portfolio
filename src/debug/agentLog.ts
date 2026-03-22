// export type AgentLogPayload = {
//   sessionId: "ed71aa";
//   runId: string;
//   hypothesisId: string;
//   location: string;
//   message: string;
//   data?: Record<string, unknown>;
//   timestamp: number;
// };

// export function agentLog(payload: Omit<AgentLogPayload, "sessionId" | "timestamp"> & { timestamp?: number }) {
//   // #region agent log
//   fetch('http://127.0.0.1:5173/ingest/0b91f655-2305-4a73-a178-b75fc096b98c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ed71aa'},body:JSON.stringify({sessionId:'ed71aa',location:payload.location,message:payload.message,data:payload.data ?? {},timestamp:payload.timestamp ?? Date.now(),runId:payload.runId,hypothesisId:payload.hypothesisId})}).catch(()=>{});
//   // #endregion
// }

