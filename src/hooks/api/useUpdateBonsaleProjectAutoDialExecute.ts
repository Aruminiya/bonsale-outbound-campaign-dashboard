import axios from 'axios';

// 取得本機 IP domain
const { hostname } = window.location;

const api_protocol = import.meta.env.VITE_API_PROTOCOL;
const port = import.meta.env.VITE_API_PORT;
const HTTP_HOST = `${api_protocol}://${hostname}:${port}`;

export default function useUpdateBonsaleProjectAutoDialExecute() {
  const updateBonsaleProjectAutoDialExecute = async (projectId: string, callFlowId: string) => {
    try {
      const response = await axios.put(`${HTTP_HOST}/api/bonsale/project/${projectId}/auto-dial/${callFlowId}/execute`, {});
      return response.data;
    } catch (error) {
      console.error('Error updating call status:', error);
      throw error;
    }
  };

  return { updateBonsaleProjectAutoDialExecute };
}