/* eslint-disable prettier/prettier */
import { axiosClient } from './axiosClient'

export const accountApi = {
    getAll() {
        const url = '/Accounts/';
        var result = axiosClient.get(url);
        return result;
    },
    getAccountByName(Name, Password, TypeAccount) {
        const url = `/Accounts/Name=${Name}&Password=${Password}&TypeAccount=${TypeAccount}`;
        var result = axiosClient.get(url);
        return result;
    },
    updateAccount(data) {
        var newData = {
            AccountName: data.accountName,
            Name: data.userName,
            Status: 2,
            Password: data.newPassword,
            ImageUrl: '',
            EmailAddress: data.email,
            PhoneNumber: data.phoneNumber.replace("-", "").replace("-", ""),
            TypeAccount: 1
        };
        const url = '/Accounts';
        return axiosClient.post(url, newData);
    }
}