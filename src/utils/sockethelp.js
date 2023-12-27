import io from "socket.io-client";

const SOCKET_URL = "http://192.168.1.106:3000/";

class WSService {
	initlizeSocket = () => {
		try {
			this.socket = io(SOCKET_URL, {
				transports: ["websocket"]
			});
			
			this.socket.on("connect", (data) => {
				console.log("socket connected");
			});

			this.socket.on("disconnect", (data) => {
				console.log("socket disconnected");
			});

			this.socket.on("error", (data) => {
				console.log("socket error", data);
			});
		} catch (err) {
			console.log("socket is not initlize,", err);
		}
	};
	emit(event, data = {}) {
		this.socket.emit(event, data);
	}
	on(event, cb) {
		this.socket.on(event, cb);
	}
	removeListener(listenerName) {
		this.socket.removeListener(listenerName);
	}
}

const sockethelp = new WSService();

export default sockethelp;
