import axios from "axios";


const url = "http://192.168.1.106:8000";
export const adduser = async (data) => {
	try {
		await axios.post(`${url}/add`, data);
	} catch (error) {
		console.log(") Error while agduser API", error.message);
	}
};

export const getusers = async () => {
	try {
		let response = await axios.get(`${url}/users`);
		return response.data;
	} catch (err) {
		console.log("error in get user ===>", err.message);
	}
};

export const setConversation = async (data) => {
	try {
		let response = await axios.post(`${url}/conversation/add`,data);
		return response.data;
	} catch (err) {
		console.log("error in setconversation api", err.message);
	}
};

export const getConversation = async (data) => {
	try {
		let response = await axios.post(`${url}/conversation/get`,data);
		return response.data;
	} catch (err) {
		console.log("error in getcoversation api", err.message);
	}
};

export const newMessage = async (data) => {
	try {
		let response = await axios.post(`${url}/message/add`,data);
		return response.data;
	} catch (err) {
		console.log("error in newMessage api", err.message);
	}
};


export const getMessages = async (id) => {
	
	try {
		let response = await axios.get(`${url}/message/get/${id}`);
		return response.data;
	} catch (err) {
		console.log("error in get Messagess api", err.message);
	}
};