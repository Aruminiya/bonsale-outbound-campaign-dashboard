import { useState, useEffect } from 'react';

import useGetBonsaleAutoDial from './api/useGetBonsaleAutoDial';
import useGetBonsaleProject from './api/useGetBonsaleProject';

const useProjectOutboundData = () => {
  const { getBonsaleAutoDial } = useGetBonsaleAutoDial();
  const { getBonsaleProject } = useGetBonsaleProject();

  const [projectOutboundData, setProjectOutboundData] = useState<ProjectOutboundDataType[]>([]);

  const fetchData = async () => {
    try {
      const bonsaleAutoDial = await getBonsaleAutoDial();
      const dataList = bonsaleAutoDial.list;

      // 將資料轉換為符合專案撥打狀態的格式
      const updatedData = await Promise.all(
        dataList.map(async (item: Project) => {
          // 將專案中的客戶電話號碼提取出來
          const customers = await getBonsaleProject(item.projectId);
          const projectCustomersDesc = customers.list.map((customer: Project) => customer);
          return {
            appId: item.appId,
            appSecret: item.appSecret,
            callFlowId: item.callFlowId,
            projectId: item.projectId,
            projectName: item.projectInfo.projectName,
            startDate: item.projectInfo.startDate,
            endDate: item.projectInfo.endDate,
            callStatus: 0,
            extension: item.callFlow.phone,
            projectCustomersDesc,
            projectCallState: 'init', // 撥打狀態
            projectCallData: null, // 撥打資料,
            isEnable: item.projectInfo.isEnable,
            toCall: null, // 待撥打的客戶
          };
        })
      );
      setProjectOutboundData(updatedData);
    } catch (error) {
      console.error('Error fetching project auto-dial data:', error);
      throw error;
    }
    };

  useEffect(() => {
    fetchData();
  }, []);

  return { projectOutboundData, setProjectOutboundData };
};

export default useProjectOutboundData;