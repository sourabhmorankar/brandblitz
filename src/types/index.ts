export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  timestamp: number;
}

export interface DesignRequest {
  id: string;
  clientId: string;
  brief: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: number;
  updatedAt: number;
}