import Pusher from "pusher-js";

export default class PusherClient {
    constructor(appKey, cluster, channel) {

        this.pusher = new Pusher(appKey, {
            cluster: cluster,
            encrypted: true
        })

        this.channel = channel
    }

    listenerEvent(eventName, fun) {
        const channel = this.pusher.subscribe(this.channel)
        channel.bind(eventName, fun)
    }


}
