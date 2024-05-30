/* eslint-disable prettier/prettier */
import { axiosClient } from './axiosClient'

export const topicApi = {
    getAllTopic() {
        const url = '/Topics/';
        var result = axiosClient.get(url);
        return result;
    },
    getTopicByAccount(AccoutName) {
        const url = `/Topics/${AccoutName}`;
        console.log(url);
        var result = axiosClient.get(url);
        return result;
    },
    registerTopic(data) {
        var newData = {
            accountName: data.accountName,
            topicId: data.topicId
        }
        const url = '/Topics/';
        return axiosClient.post(url, newData);
    }
}