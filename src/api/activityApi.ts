import axiosClient from './axiosClient';

const activityApi = {
  getAllActivitiesInBoard(boardId: string, params: any): Promise<any> {
    return axiosClient.get(`/boards/${boardId}/activities`, { params });
  },
  getByMember(payload: { boardId: string; memberId: string }, params: any): Promise<any> {
    return axiosClient.get(`/boards/${payload.boardId}/activities/members/${payload.memberId}`, { params });
  },
};

export default activityApi;
