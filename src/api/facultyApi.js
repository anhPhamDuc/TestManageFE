/* eslint-disable prettier/prettier */
import { axiosClient } from './axiosClient'

export const facultyApi = {
    getAllFaculty() {
        const url = '/Faculties/';
        var result = axiosClient.get(url);
        return result;
    },
    getTopicByAccount(AccoutName) {
        const url = `/Faculties/${AccoutName}`;
        console.log(url);
        var result = axiosClient.get(url);
        return result;
    },
    registerTopic(data) {
        var newData = {
            accountName: data.accountName,
            topicId: data.topicId
        }
        const url = '/Faculties/';
        return axiosClient.post(url, newData);
    }
}