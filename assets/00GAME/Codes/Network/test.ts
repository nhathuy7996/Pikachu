import { _decorator, Component, Node } from 'cc';
import { NetworkingPeer } from './NetworkingPeer';
const { ccclass, property } = _decorator;
 
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';
import { METHOD, RequestBase } from './RequestBase';

@ccclass('test')
export class test extends Component  {
    EventMap = ()=> 'BOARD/genCat';

    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    start() {
        NetworkingPeer.getInstance<NetworkingPeer>().connectToWebSocket();
       // NetworkingPeer.getInstance<NetworkingPeer>().AddListener(this.EventMap(),this.onServerMessegeRev);

        let dataMerge = {
            id1: 0,
            id2: 1
        }

     //   NetworkingPeer.getInstance<NetworkingPeer>().EmmitEvent(this.EventMap(), dataMerge);

    //    new RequestBase("https://purrate-king-api-test.miraistudio.games/openapi#tag/Referral/operation/GetReferrerLeaderboard",METHOD.GET).Send(data=>{
    //         console.log(data);
    //    });
    }
 

    onServerMessegeRev(data: any){
        console.log(data);
        let parse = JSON.parse(data);

        console.log(parse.isSuccess);
        console.log(parse.board);
    }
}
