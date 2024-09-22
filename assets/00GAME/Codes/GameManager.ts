import { _decorator, Component, Node } from 'cc';
import { HuynnLib } from './Lib/Singleton';
import { NetworkingPeer } from './Network/NetworkingPeer';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends HuynnLib.Singleton<GameManager> {
    onLoad() {
        GameManager.instance = this;
    }

    protected start(): void {
        //NetworkingPeer.getInstance<NetworkingPeer>().connectToWebSocket();
        console.log(window.Telegram.WebApp.initData);
        console.log(window.Telegram.WebApp.initDataUnsafe);
    }

    update(deltaTime: number) {
        
    }
}

