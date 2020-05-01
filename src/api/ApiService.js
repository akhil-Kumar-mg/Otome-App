import React, { useState } from 'react';

export const get = () => {
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956"
    }
    return fetch(options.url).then(response => response.json())
}

export const viewLiveDevices = () => {
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
        body: { "method": "GET", "url": "/VIEWACTIVE" }
    }
    return fetch(options.url, {
        method: "POST",
        body: JSON.stringify(options.body)
    })
}

export const viewArea = () => {
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
        body: { "method": "GET", "url": "/VIEWGROUPS" }
    }
    return fetch(options.url, {
        method: "POST",
        body: JSON.stringify(options.body)
    })
}

export const updateDeviceStatus = (id, action, status) => {
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
        body: { "method": "POST", "data": { "request_type": "id", "id": id, "action": action, "value": status } }
    }
    fetch(options.url, {
        method: "POST",
        body: JSON.stringify(options.body)
    })
}

export const addDevice = (area, name, addr, channel, type) => {
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
        body: { "method": "POST", "data": { "request_type": "add", "entity": "device", "type": type, "name": name, "address": addr, "channel": channel, "group": area, "icon": "icon" } }
    }
    console.debug(options.body)
    return fetch(options.url, {
        method: "POST",
        body: JSON.stringify(options.body)
    })
}