import { SOCKET_PORT } from ".";

export function GetBaseAddressWS(){
    const base = window.location.hostname;
    return `ws://${base}:${SOCKET_PORT}`;
}
