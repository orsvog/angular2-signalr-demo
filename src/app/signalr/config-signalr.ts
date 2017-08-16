import { SignalRConfiguration } from 'ng2-signalr';
export function createConfig(): SignalRConfiguration {
    const c = new SignalRConfiguration();
    c.hubName = 'Ng2SignalRHub';
    c.qs = { user: 'donald' };
    //c.url = 'http://telesaledev.datacenter.ssbs.com.ua/SignalRApp';
    c.url = 'http://ng2-signalr-backend.azurewebsites.net';
    c.logging = true;
    return c;
}
