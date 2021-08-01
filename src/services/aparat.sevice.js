const httpStatus = require('http-status');
const axios = require('axios');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const md5 = require('md5');
const sha1 = require('sha1');
const { response } = require('express');
const ApiSuceess = require('../utils/ApiSuccess');



const loginToAparat = async(username, password) => {

    const hashPassword = sha1(md5(password));
    const loginBody = await axios.post(`https://www.aparat.com/etc/api/login/luser/${username}/lpass/${hashPassword}`)
        .then((response) => {
            ltoken = response.data.login;
            return ltoken;
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });

        if(!loginBody) { throw new ApiError(httpStatus.NOT_FOUND, 'most request please try 3 min later')};
        const result = ApiSuceess(loginBody , 'Login Succesfuly', httpStatus.OK);
        return result;
}


const createUploadForm = async(username, token) => {


    const uploadForm = await axios.post(`https://www.aparat.com/etc/api/upload%E2%80%8Bform/luser/${username}/ltoken/${token}`)
        .then((response) => {
            const form = response.data.uploadform;
            console.log(form);
            return form;
        })
        .catch((error) => {
            // handel error
            // throw new ApiError(httpStatus.NOT_FOUND, error);
            console.log(error);
        })

        if(!uploadForm) { throw new ApiError(httpStatus.NOT_FOUND, 'uploadForm is not reachable')};
        const result = ApiSuceess(uploadForm, 'Get Form Id Successfuly', httpStatus.OK);
        return result;

};

const getUploadfileUID = async(uploadform, formData) => {

    const uploadpost = await axios.post(uploadform.body.formAction, formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
         })
        .then((response) => {
            const res = response.data;
            return res;
        })
        .catch((error) => {
            console.log(error);
        });

        if(!uploadpost) { throw new ApiError(httpStatus.NOT_FOUND, 'uploadpost is NOT uploaded')};
        const result = ApiSuceess(uploadpost, 'Get uoload file uid Successfuly', httpStatus.OK);
        return JSON.stringify(result);

};


module.exports = {
    loginToAparat,
    createUploadForm,
    getUploadfileUID
};