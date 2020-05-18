import React, { useState } from 'react';
import Toast from 'react-native-simple-toast';

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

export const viewAllDevices = () => {
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
        body: { "method": "GET", "url": "/VIEWALLDEVICES" }
    }
    return fetch(options.url, {
        method: "POST",
        body: JSON.stringify(options.body)
    })
}

export const viewArea = (areaName) => {
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
        body: areaName != undefined ? { "method": "GET", "url": "/VIEWGROUP", "query": { "g": areaName } }
            : { "method": "GET", "url": "/VIEWGROUPS" }
    }
    console.debug(options)
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
    }).then(res => {
        Toast.show("Updated Device Status Successfully")
    }).catch(err => {
        Toast.show("Failed to Updated Device Status")
    })
}

export const addDevice = (area, name, addr, channel, type) => {
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
        body: { "method": "POST", "data": { "request_type": "add", "entity": "device", "type": type, "name": name, "address": addr, "channel": channel, "group": area, "icon": "icon" } }
    }
    return fetch(options.url, {
        method: "POST",
        body: JSON.stringify(options.body)
    })
}

export const addDateSchedule = (scheduleName, shortCutName, shortCutId, time, date) => {
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
        body: {
            "method": "POST", "data": {
                "request_type": "add",
                "entity": "schedule",
                "name": scheduleName, "scene_id": shortCutId, "scene_name": shortCutName, "time": time + ":00", "type": "DATE", "date": date
            }
        }
    }
    console.debug(options.body)
    return fetch(options.url, {
        method: "POST",
        body: JSON.stringify(options.body)
    })
}

export const addDaysSchedule = (scheduleName, shortCutName, shortCutId, time, days) => {
    const daysArr = ["0", "0", "0", "0", "0", "0", "0"];
    for (let i = 0; i < 7; i++) {
        if (days[i].length != 0) {
            daysArr[i] = "1"
        }
    }
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
        body: {
            "method": "POST", "data": {
                "request_type": "add",
                "entity": "schedule",
                "name": scheduleName,
                "scene_id": shortCutId,
                "scene_name": shortCutName,
                "time": time + ":00", "type": "DAYS",
                "days": daysArr
            }
        }
    }
    return fetch(options.url, {
        method: "POST",
        body: JSON.stringify(options.body)
    })
}


export const addIntervalSchedule = (scheduleName, shortCutName, shortCutId, time, days, intervalTime) => {
    const daysArr = ["0", "0", "0", "0", "0", "0", "0"];
    for (let i = 0; i < 7; i++) {
        if (days[i].length != 0) {
            daysArr[i] = "1"
        }
    }
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
        body: {
            "method": "POST", "data": {
                "request_type": "add",
                "entity": "schedule",
                "name": scheduleName,
                "scene_id": shortCutId,
                "scene_name": shortCutName,
                "time": time + ":00",
                "type": "INTERVAL", "value": daysArr, "interval": intervalTime
            }

        }
    }
    return fetch(options.url, {
        method: "POST",
        body: JSON.stringify(options.body)
    })
}

export const viewSchedules = () => {
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
        body: { "method": "GET", "url": "/VIEWSCHEDULES" }
    }
    return fetch(options.url, {
        method: "POST",
        body: JSON.stringify(options.body)
    })
}

export const createArea = (areaName) => {
    const options = {
        url: "http://13.232.56.9/api/v1/home/client?uuid=24956",
        body: { "method": "POST", "data": { "request_type": "add", "entity": "group", "name": areaName, "icon": "13" } }
    }

    fetch(options.url, {
        method: "POST",
        body: JSON.stringify(options.body)
    }).then(res => {
        Toast.show("Area Created")
    }).catch(err => {
        Toast.show("Failed to create area")
    })
}