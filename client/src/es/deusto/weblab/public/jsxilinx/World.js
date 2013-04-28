{
    "metadata":
    {
        "format" : "myWorld",
        "formatVersion" : 1.0
    },

    "objects":
        [
            {
                "name" : "watertank",
                "model" : "WaterTank.js",
                "scale" : [100, 100, 100],
                "position" : [600, 0, 0]
            },
            {
                "name" : "water",
                "model" : function() { return new THREE.CylinderGeometry(95, 95, 200, 50, 50, false); },
                "initialTranslation" : [0, 100, 0],
                "scale" : [.95, .1, .95],
                "position" : [597, -95, 0],
                "material" : function() { return new THREE.MeshBasicMaterial({ color: 0x0000FF }); },
            },
            {
                "name" : "waterfallRight",
                "model" : "waterfall.js",
                "initialTranslation" : [-0.311444, 0, 0],
                "scale": [100, 100, 100],
                "position": [700, 0, 0],
                "material" : function() { return new THREE.MeshBasicMaterial({color:0x0000FF}); }
            },
            {
                "name" : "waterfallLeft",
                "model" : "waterfall.js",
                "initialTranslation" : [-0.311444, 0, 0],
                "scale": [100, 100, 100],
                "position": [495, 0, 0],
                "rotations": [ { "axis" : [0, 1, 0], "deg" : 180 } ],
                "material" : function() { return new THREE.MeshBasicMaterial({color:0x0000FF}); }
            },
            {
                "name" : "waterfallOut",
                "model" : "waterfall.js",
                "initialTranslation" : [-0.311444, 0, 0],
                "scale" : [100, 100, 100],
                "position" : [445, -155, 0],
                "materialss" : 
                    function() {
                        console.log("WATER IS: " + __water);
                        //var watertexture = THREE.ImageUtils.loadTexture('water.jpg');
                        var mat = new THREE.MeshPhongMaterial({ map: __water, ambient: 0.9, color: 0xAAAAFF });
                        var mats = new THREE.MeshFaceMaterial(mat);
                        return mats;
                    }
            },
            {
                "name" : "waterpumpRight",
                "model" : "waterpump.js",
                "scale" : [100, 100, 100],
                "position" : [720, 70, 30],
                "material" : function() { return new THREE.MeshLambertMaterial({ color: 0x0000FF, ambient: 0x00 }); }
            },
            {
                "name" : "waterpumpLeft",
                "model" : "waterpump.js",
                "scale" : [100, 100, 100],
                "position" : [470, 78, 0],
                "rotations": [ { "axis" : [0, 1, 0], "deg" : 180 } ],
                "material" : function() { return new THREE.MeshLambertMaterial({ color: 0x0000FF, ambient: 0x00 }); }
            },
            {
                "name" : "pipe",
                "model" : "pipe.js",
                "scale" : [100, 100, 100],
                "position": [470, -80, 0]
            },
            {
                "name" : "marker",
                "model" : function() { return new THREE.SphereGeometry(5, 10, 10); },
                "material" : function() { return new THREE.MeshBasicMaterial({ color: 0xFF0000 }); },
                "position" : [600, 0, 0]
            }
    ],

    "pointlights":
    [
        {
            "name" : "light1",
            "position" : [10, 250, 130],
            "color": "0xFFFFFF"
        }
    ],

    "ambientlight":
    {
        "color" : "0xFFFFFF"
    },


    "onLoaded" : 
        function() {
            console.log("[WORLDLOADER]: FINISHED");
        }

}