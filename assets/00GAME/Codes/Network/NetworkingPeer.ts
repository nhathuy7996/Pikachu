import { _decorator, Component, Node, path } from 'cc';
import io from 'socket.io-client/dist/socket.io.js';
import { Singleton } from './Singleton';
const { ccclass, property } = _decorator;

//import { IServerMessage } from './Event/IServerMessage'; 
import { Socket } from 'socket.io-client';


@ccclass('NetworkingPeer')
export class NetworkingPeer extends Singleton<NetworkingPeer> {
    
    socket : Socket;

    public connectToWebSocket() { 
      this.socket = io('localhost:3000', {
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
          console.log('Connected to server');
          
        }); 
    }

    AddListener(EventMap:string, callback: any){
      this.socket.on(EventMap, callback);
    }

    EmmitEvent(EventMap: string, data: any){
      this.socket.emit(EventMap, data);
    }
 
}



