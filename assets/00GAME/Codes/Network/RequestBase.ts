import { _decorator} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RequestBase')
export class RequestBase {

    _url: string;
    _method: METHOD = METHOD.GET;
    _xhr: XMLHttpRequest;
    _params: string;

    _uri: string = "https://api.purrateking.io";

    constructor(url: string, method: METHOD = METHOD.GET, datas: any = null) {
        this._url = this._uri+ url;
        this._method = method;

        this._xhr = new XMLHttpRequest();
        this._xhr.open(method, this._url, true);
        this._xhr.setRequestHeader('Content-Type', 'application/json');
        this._xhr.setRequestHeader('Access-Control-Allow-Origin','*');
        this._xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
        this._xhr.setRequestHeader('Access-Control-Allow-Headers', "Content-Type, Authorization, X-Requested-With");
        this._params = "";
        if(datas != null){  
            let  name;
            for( name in datas ) {
                this._params = JSON.stringify(datas);
            }
            
        }
    }

    SetHeader(key: string, value: string){
        this._xhr.setRequestHeader(key, value);
        return this;
    }

    Send(callback: any) {

        this._xhr.onreadystatechange = () => {
            if (this._xhr.readyState === 4) {

                if (this._xhr.status >= 200 && this._xhr.status < 300) {
                    
                } else {
                    console.error('Error calling API:', this._xhr.status, this._xhr.statusText);
                }

                let response = {
                    status: this._xhr.status,
                    resJSON: JSON.parse(this._xhr.responseText)
                }
                console.log('API response:', response); 
                callback(response);
                
            }
        };

        if(this._method != METHOD.POST)
            this._xhr.send();
        else
            this._xhr.send(this._params);
    }
}

export enum METHOD{
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE'
}

