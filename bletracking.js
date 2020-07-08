class BLETracking {

    constructor(id) {
        this.id = id;
    }


      
    /**
     * Calculates the distance to the beacon, based on the RSSI
     * @param {number} rssi 
     * @param {number} txPower Constant which specifies the maximum level of transmision of the Beacon. Usually ranges between -59 to -65
     */
    getDistance(rssi, txPower) {

        if (rssi == 0) {
            return -1.0;
        }

        var ratio = rssi * 1.0 / txPower;
        if (ratio < 1.0) {
            return Math.pow(ratio, 10);
        } else {
            var distance = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
            return distance;
        }         
        
    }

    /**
     * Calculate the trilateration and returns the (x,y) location of a Beacon
     * It works better with, at least, 3 beacon objects
     * beacon = {
     *      x: position_x,
     *      y: position_y,
     *      distance: distance
     * }
     * @param {*} a 
     * @param {*} b 
     * @param {*} c 
     */
    getTrilateration(a, b, c) {

        var A = 2 * b.x - 2 * a.x;
        var B = 2 * b.y - 2 * a.y;
        var C = Math.pow(a.distance, 2) - Math.pow(b.distance, 2) - Math.pow(a.x, 2) + Math(b.x, 2) - Math.pow(a.y, 2) + Math.pow(b.y, 2);
        var D = 2 * c.x - 2 * b.x;
        var E = 2 * c.y - 2 * b.y;
        var F = Math.pow(b.distance, 2) - Math.pow(c.distance, 2) - Math.pow(b.x, 2) + Math.pow(c.x, 2) - Math.pow(b.y, 2) + Math.pow(c.y, 2);
        var x = (C * E - F * B) / (E * A - B * D);
        var y = (C * D - A * F) / (B * D - A * E);
        return {x, y};
    }


}