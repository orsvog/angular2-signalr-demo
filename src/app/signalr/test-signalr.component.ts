import { Component, OnInit } from '@angular/core';

import 'expose-loader?jQuery!jquery';
import '../../../node_modules/signalr/jquery.signalR.js';
import { SignalRConnection, SignalR } from 'ng2-signalr';
import { BroadcastEventListener } from './broadcast.event.listener';

@Component({
    moduleId: module.id,
    selector: 'test-signalr',
    templateUrl: './test-signalr.component.html',
    styleUrls: ['./test-signalr.component.scss']
})
export class TestSignalrComponent implements OnInit {
    connection;
    listenDisabled: Boolean = false;
    isConnected: Boolean = false;
    listenName: string = 'OnMessageSent';
    invokeName: string = 'Chat';
    message: string;
    incomingMessage: string;
    options = {
        hubName: 'Ng2SignalRHub',
        url: 'http://ng2-signalr-backend.azurewebsites.net'
    }

    constructor(private signalR: SignalR) {

        this.loadOptions();

        // this.connection = route.snapshot.data['connection'];


    }

    ngOnInit() {
        // console.log(this.route.snapshot.data);
        // this.connection = this.route.snapshot.data['connection'];
        // console.log(this.connection);
    }

    saveOptions() {
        this.setItem('options', JSON.stringify(this.options));
    }

    loadOptions() {
        this.options = JSON.parse(this.getItem('options')) || this.options;
    }

    defaultOptions() {
        this.options = {
            hubName: 'Ng2SignalRHub',
            url: 'http://ng2-signalr-backend.azurewebsites.net'
        };
        this.listenName = 'OnMessageSent';
        this.invokeName = 'Chat';
    }

    connect() {
        //this.signalR.connect(this.options);

        this.message = 'Connecting to server (pending) ...';

        console.log(this.signalR);
        this.signalR.connect(this.options).then(res => {
            this.isConnected = true;
            this.connection = res;
            this.message = "Successfuly connected!";
            console.log(res);
        }).catch(error => {
            console.log(error);
            this.message = "Connection failed. " + error;
        });
    }

    listen() {
        this.listenDisabled = true;
        // 1.create a listener object
        let onMessageSent$ = new BroadcastEventListener<any>(this.listenName); //ON_MESSAGE_SENT

        // 2.register the listener
        this.connection.listen(onMessageSent$);

        // // 3.subscribe for incoming messages
        onMessageSent$.subscribe((res) => {
            let str = res;
            if (typeof str === 'object') {
                str = JSON.stringify(str);
            }
            this.incomingMessage = "Resived message from server : " + str;
            console.log('new incoming data: ', res);
            alert('Woohoo. Incoming message from server, view console for details');
        });

        this.message = "Listener is set to: " + this.listenName;

        this.connection.status.subscribe((status) => {
            console.log('status: ', status);
        });
    }

    invoke() {

        // // invoke a server side method
        // this.connection.invoke('GetNgBeSpeakers').then((data: string[]) => {
        //     console.log(data);
        // });



        this.connection.invoke(this.invokeName, {})
            .then(data => {
                console.log(data);
                this.message = "Invoke success";
            })
            .catch((err: any) => {
                console.log('Failed to invoke \'Chat\'. Error occured. Error:' + err);
                this.message = "Invoke failed. " + err;
            });

        this.message = "Invoke for " + this.invokeName;

        // // invoke a server side method, with parameters
        // this.connection.invoke('ServerMethodName', new Parameters()).then((data: string[]) => {
        //     this.members = data;
        // });

    }

    private setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    private getItem(key: string): string {
        return localStorage.getItem(key);
    }
}
