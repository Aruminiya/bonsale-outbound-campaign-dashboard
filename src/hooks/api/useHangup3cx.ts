import axios from 'axios';

// 取得本機 IP domain
const { hostname } = window.location;

const api_protocol = import.meta.env.VITE_API_PROTOCOL;
const port = import.meta.env.VITE_API_PORT;
const HTTP_HOST = `${api_protocol}://${hostname}:${port}`;

export default function useHangup3cx() {
  const Hangup3cx = async (
    dn: string,
    id: number,
    token_3cx: string,
  ): Promise<ToCallResponse> => {
    try {
      // 發送掛斷電話的請求
      console.log('token_3cx', token_3cx);
      const result = await axios.post(`${HTTP_HOST}/api/callControl/hangup`, { dn, id, token_3cx });
      return result.data as ToCallResponse;
    } catch (error) {
      console.error('Error starting outbound:', error);
      throw error;
    }
  };

  return { Hangup3cx };
}