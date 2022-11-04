
import express from 'express';
const app = express();
import redis from 'redis';
import axios from 'axios';
import cors from 'cors';

const EXPIRATION_VALUE = 10;
//app.use(express.urlencoded({extended : true}))
app.use(cors())
var client  = redis.createClient('6379','127.0.0.1');
client.connect();
client.on('error', function (err) {
    console.log('could not establish a connection with redis. ' + err);
  });
  client.on('connect', function (err) {
    console.log('connected to redis successfully');
  });


  app.get('/clear', (req, res) => {
        client.flushAll();
        res.json({message:"cache cleared sucessfully!"});
    });
   


    app.get('/v2/recommendations', async (req, res) => {
       getByKey('suggestions').then((data)=>{
        if(data!=null){
            console.log('CACHE HIT');
            res.json(JSON.parse(data));
           }else{
             axios.get('https://devbrains.tn/tutorials/mark-task-as-done/suggest?limit=110&isCurrentExcluded=false').then((response)=>{
                //console.log(response.data);
                console.log('CACHE MISS');
                storeByKeyValue('suggestions',JSON.stringify(response.data))
                res.json(response.data)
                
            }).catch(function (error) {
                console.log(error);
            });  
    
           }
       }).catch(function (error) {
        console.log(error);
    });
      
    
    });

    app.get('/v1/recommendations', async (req, res) => {
       
        axios.get('https://devbrains.tn/tutorials/mark-task-as-done/suggest?limit=110&isCurrentExcluded=false').then((response)=>{
            //console.log(response.data);
            console.log('CACHE MISS');
            storeByKeyValue('suggestions',JSON.stringify(response.data))
            res.json(response.data)
            
        }).catch(function (error) {
            console.log(error);
        });  

    
     });
       
     app.get('/static/recommendations', async (req, res) => {
      res.send(`
      [
        {
            "id": 110,
            "youtubeId": "ShFTxm7KyBI",
            "title": "Adding a unique Identifier",
            "slug": "adding-a-unique-identifier",
            "level": 1,
            "duration": 5,
            "rank": 24,
            "createdAt": {
                "date": "2022-10-26 18:45:51.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 30,
            "oldExternalViews": 30,
            "currentInternalViews": 32,
            "oldInternalViews": 32,
            "likeCount": 1,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 77.38461538461539
        },
        {
            "id": 107,
            "youtubeId": "1Md-UiOvFvk",
            "title": "Loading Data From Cache",
            "slug": "loading-data-from-cache",
            "level": 1,
            "duration": 8,
            "rank": 23,
            "createdAt": {
                "date": "2022-09-29 19:11:12.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 60,
            "oldExternalViews": 60,
            "currentInternalViews": 72,
            "oldInternalViews": 72,
            "likeCount": 5,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 63.03846153846154
        },
        {
            "id": 106,
            "youtubeId": "mimjlIyth2U",
            "title": "Simplifying cached Data Format",
            "slug": "flutter-practice-simplifying-cached-data-format",
            "level": 1,
            "duration": 10,
            "rank": 22,
            "createdAt": {
                "date": "2022-09-22 16:29:47.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 29,
            "oldExternalViews": 29,
            "currentInternalViews": 85,
            "oldInternalViews": 85,
            "likeCount": 1,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 57.19230769230769
        },
        {
            "id": 103,
            "youtubeId": "uY8hJ7ZoF-s",
            "title": "How To Pass Parameters To A Custom Widget",
            "slug": "how-to-pass-parameters-to-a-custom-widget",
            "level": 1,
            "duration": 5,
            "rank": 19,
            "createdAt": {
                "date": "2022-06-22 14:00:37.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 301,
            "oldExternalViews": 298,
            "currentInternalViews": 1234,
            "oldInternalViews": 1226,
            "likeCount": 5,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 55.07692307692308
        },
        {
            "id": 105,
            "youtubeId": "js6JdT5b2xs",
            "title": "How to Cache Data In Your App",
            "slug": "how-to-cache-data-in-your-app",
            "level": 1,
            "duration": 8,
            "rank": 21,
            "createdAt": {
                "date": "2022-09-04 12:25:47.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 149,
            "oldExternalViews": 145,
            "currentInternalViews": 95,
            "oldInternalViews": 95,
            "likeCount": 2,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 54.88461538461539
        },
        {
            "id": 104,
            "youtubeId": "m0GsvOalY6Y",
            "title": "Serializable Models",
            "slug": "serializable-models",
            "level": 1,
            "duration": 7,
            "rank": 20,
            "createdAt": {
                "date": "2022-08-16 10:03:41.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 56,
            "oldExternalViews": 55,
            "currentInternalViews": 95,
            "oldInternalViews": 95,
            "likeCount": 2,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 53.07692307692308
        },
        {
            "id": 83,
            "youtubeId": "716cdVcvvrU",
            "title": "Custom Table Calendar",
            "slug": "custom-table-calendar",
            "level": 1,
            "duration": 12,
            "rank": 11,
            "createdAt": {
                "date": "2022-03-16 15:32:50.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 1442,
            "oldExternalViews": 1438,
            "currentInternalViews": 808,
            "oldInternalViews": 807,
            "likeCount": 15,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 52.96153846153846
        },
        {
            "id": 90,
            "youtubeId": "CEX4dKAa-FU",
            "title": "Save Form Data Using Provider",
            "slug": "save-form-data-using-provider",
            "level": 1,
            "duration": 9,
            "rank": 13,
            "createdAt": {
                "date": "2022-05-06 14:21:09.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 666,
            "oldExternalViews": 665,
            "currentInternalViews": 914,
            "oldInternalViews": 912,
            "likeCount": 8,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 52.38461538461539
        },
        {
            "id": 95,
            "youtubeId": "o1WyG0_RwDI",
            "title": "Count Tasks in Table Calendar",
            "slug": "count-tasks-in-table-calendar",
            "level": 1,
            "duration": 8,
            "rank": 14,
            "createdAt": {
                "date": "2022-05-29 15:12:57.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 508,
            "oldExternalViews": 505,
            "currentInternalViews": 169,
            "oldInternalViews": 169,
            "likeCount": 5,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 51.42307692307692
        },
        {
            "id": 100,
            "youtubeId": "6TCpVWBUmvI",
            "title": "Testing & Fixing Tasks Classification",
            "slug": "testing-fixing-tasks-classification",
            "level": 1,
            "duration": 4,
            "rank": 16,
            "createdAt": {
                "date": "2022-06-15 12:12:54.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 16,
            "oldExternalViews": 16,
            "currentInternalViews": 139,
            "oldInternalViews": 139,
            "likeCount": 1,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 51.11538461538461
        },
        {
            "id": 98,
            "youtubeId": "4dXMIM-zzfc",
            "title": "Reorganizing tasks and refactoring our Provider",
            "slug": "reorganizing-tasks-and-refactoring-our-provider",
            "level": 1,
            "duration": 17,
            "rank": 15,
            "createdAt": {
                "date": "2022-06-12 07:29:33.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 56,
            "oldExternalViews": 56,
            "currentInternalViews": 147,
            "oldInternalViews": 147,
            "likeCount": 3,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 50.92307692307692
        },
        {
            "id": 74,
            "youtubeId": "0EYodTjCCK4",
            "title": "Create a Model Class",
            "slug": "create-a-model-class",
            "level": 1,
            "duration": 2,
            "rank": 4,
            "createdAt": {
                "date": "2022-02-03 15:02:41.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 250,
            "oldExternalViews": 248,
            "currentInternalViews": 890,
            "oldInternalViews": 888,
            "likeCount": 2,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 50.30769230769231
        },
        {
            "id": 75,
            "youtubeId": "ZILCpgv_2HI",
            "title": "Create Task Provider",
            "slug": "create-task-provider",
            "level": 1,
            "duration": 7,
            "rank": 5,
            "createdAt": {
                "date": "2022-02-03 15:21:30.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 115,
            "oldExternalViews": 114,
            "currentInternalViews": 195,
            "oldInternalViews": 195,
            "likeCount": 2,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 50.11538461538461
        },
        {
            "id": 80,
            "youtubeId": "ev5R9vNJfFA",
            "title": "Create Form Fields & Calendar",
            "slug": "create-form-fields-calendar",
            "level": 1,
            "duration": 12,
            "rank": 10,
            "createdAt": {
                "date": "2022-02-24 18:41:02.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 224,
            "oldExternalViews": 224,
            "currentInternalViews": 588,
            "oldInternalViews": 588,
            "likeCount": 4,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 49.80769230769231
        },
        {
            "id": 77,
            "youtubeId": "uSrnc9NO1oI",
            "title": "Adding Styles & Checkboxes",
            "slug": "adding-styles-checkboxes",
            "level": 1,
            "duration": 12,
            "rank": 7,
            "createdAt": {
                "date": "2022-02-10 18:27:57.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 117,
            "oldExternalViews": 117,
            "currentInternalViews": 398,
            "oldInternalViews": 398,
            "likeCount": 4,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 49.65384615384615
        },
        {
            "id": 78,
            "youtubeId": "o6aFvrLPPEg",
            "title": "Add Tabs",
            "slug": "add-tabs",
            "level": 1,
            "duration": 7,
            "rank": 8,
            "createdAt": {
                "date": "2022-02-14 17:20:37.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 79,
            "oldExternalViews": 78,
            "currentInternalViews": 206,
            "oldInternalViews": 206,
            "likeCount": 4,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 49.61538461538461
        },
        {
            "id": 63,
            "youtubeId": "YUF21NQ_o3E",
            "title": "Preparing the environment",
            "slug": "preparing-the-environment-1",
            "level": 1,
            "duration": 11,
            "rank": 2,
            "createdAt": {
                "date": "2021-11-23 18:23:16.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 139,
            "oldExternalViews": 138,
            "currentInternalViews": 181,
            "oldInternalViews": 181,
            "likeCount": 7,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 49.57692307692308
        },
        {
            "id": 79,
            "youtubeId": "shAZ9zNiDi4",
            "title": "Routing & Navigation Setup",
            "slug": "routing-navigation-setup",
            "level": 1,
            "duration": 7,
            "rank": 9,
            "createdAt": {
                "date": "2022-02-19 15:29:10.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 133,
            "oldExternalViews": 133,
            "currentInternalViews": 213,
            "oldInternalViews": 213,
            "likeCount": 3,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 49.57692307692308
        },
        {
            "id": 76,
            "youtubeId": "Eif8CZw4xJk",
            "title": "Create List Interface",
            "slug": "create-list-interface",
            "level": 1,
            "duration": 15,
            "rank": 6,
            "createdAt": {
                "date": "2022-02-07 18:32:48.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 112,
            "oldExternalViews": 112,
            "currentInternalViews": 207,
            "oldInternalViews": 207,
            "likeCount": 4,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 49.23076923076923
        },
        {
            "id": 62,
            "youtubeId": "Pe8ZHD8AQ1Y",
            "title": "Flutter Practice : Playlist Introduction",
            "slug": "flutter-practice-playlist-introduction",
            "level": 1,
            "duration": 5,
            "rank": 1,
            "createdAt": {
                "date": "2021-11-16 19:06:56.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 252,
            "oldExternalViews": 251,
            "currentInternalViews": 207,
            "oldInternalViews": 207,
            "likeCount": 4,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 48.73076923076923
        },
        {
            "id": 71,
            "youtubeId": "16YQMu7SJb8",
            "title": "Text Widget",
            "slug": "text-widget",
            "level": 1,
            "duration": 2,
            "rank": 5,
            "createdAt": {
                "date": "2022-01-15 20:32:39.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 48,
            "oldExternalViews": 48,
            "currentInternalViews": 157,
            "oldInternalViews": 156,
            "likeCount": 5,
            "playlistId": 9,
            "playlistTitle": "Flutter Widgets",
            "score": 48.57692307692308
        },
        {
            "id": 72,
            "youtubeId": "Vo-3tfcDcsA",
            "title": "Container Widget",
            "slug": "container-widget",
            "level": 1,
            "duration": 2,
            "rank": 6,
            "createdAt": {
                "date": "2022-01-24 16:14:25.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59,60",
            "currentExternalViews": 37,
            "oldExternalViews": 37,
            "currentInternalViews": 156,
            "oldInternalViews": 156,
            "likeCount": 3,
            "playlistId": 9,
            "playlistTitle": "Flutter Widgets",
            "score": 48.57692307692308
        },
        {
            "id": 101,
            "youtubeId": "PbrwBDun6pw",
            "title": "Nested List View",
            "slug": "nested-list-view",
            "level": 1,
            "duration": 12,
            "rank": 17,
            "createdAt": {
                "date": "2022-06-16 18:46:25.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59",
            "currentExternalViews": 243,
            "oldExternalViews": 242,
            "currentInternalViews": 609,
            "oldInternalViews": 607,
            "likeCount": 7,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 37.15384615384615
        },
        {
            "id": 102,
            "youtubeId": "tHukLtOAAFU",
            "title": "Flexible Checkbox List Tile",
            "slug": "flexible-checkbox-list-tile",
            "level": 1,
            "duration": 4,
            "rank": 18,
            "createdAt": {
                "date": "2022-06-20 13:17:46.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59",
            "currentExternalViews": 59,
            "oldExternalViews": 59,
            "currentInternalViews": 289,
            "oldInternalViews": 288,
            "likeCount": 2,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 36.46153846153846
        },
        {
            "id": 89,
            "youtubeId": "YhW5LfkWFKM",
            "title": "Custom Form Fields Style",
            "slug": "custom-form-fields-style",
            "level": 1,
            "duration": 11,
            "rank": 12,
            "createdAt": {
                "date": "2022-04-07 02:39:43.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59",
            "currentExternalViews": 252,
            "oldExternalViews": 252,
            "currentInternalViews": 283,
            "oldInternalViews": 283,
            "likeCount": 3,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 34.73076923076923
        },
        {
            "id": 64,
            "youtubeId": "FgawkEG7Q9s",
            "title": "MaterialApp Widget",
            "slug": "flutter-widgets-materialapp-widget",
            "level": 1,
            "duration": 1,
            "rank": 1,
            "createdAt": {
                "date": "2021-11-30 18:51:42.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59",
            "currentExternalViews": 121,
            "oldExternalViews": 121,
            "currentInternalViews": 226,
            "oldInternalViews": 226,
            "likeCount": 4,
            "playlistId": 9,
            "playlistTitle": "Flutter Widgets",
            "score": 33.84615384615385
        },
        {
            "id": 66,
            "youtubeId": "nJ1Zr8-k6JE",
            "title": "AppBar Widget",
            "slug": "appbar-widget",
            "level": 1,
            "duration": 1,
            "rank": 3,
            "createdAt": {
                "date": "2021-12-14 19:15:19.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59",
            "currentExternalViews": 58,
            "oldExternalViews": 58,
            "currentInternalViews": 163,
            "oldInternalViews": 163,
            "likeCount": 5,
            "playlistId": 9,
            "playlistTitle": "Flutter Widgets",
            "score": 33.69230769230769
        },
        {
            "id": 73,
            "youtubeId": "E1tSgd2Iq_w",
            "title": "To Do Project Setup",
            "slug": "to-do-project-setup",
            "level": 1,
            "duration": 6,
            "rank": 3,
            "createdAt": {
                "date": "2022-02-01 18:46:31.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59",
            "currentExternalViews": 84,
            "oldExternalViews": 84,
            "currentInternalViews": 188,
            "oldInternalViews": 188,
            "likeCount": 3,
            "playlistId": 8,
            "playlistTitle": "Flutter Practice",
            "score": 33.61538461538461
        },
        {
            "id": 67,
            "youtubeId": "Ci4iA7mGSZs",
            "title": "SafeArea Widget",
            "slug": "safearea-widget",
            "level": 1,
            "duration": 1,
            "rank": 4,
            "createdAt": {
                "date": "2021-12-21 18:51:06.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59",
            "currentExternalViews": 62,
            "oldExternalViews": 62,
            "currentInternalViews": 167,
            "oldInternalViews": 167,
            "likeCount": 3,
            "playlistId": 9,
            "playlistTitle": "Flutter Widgets",
            "score": 33.5
        },
        {
            "id": 65,
            "youtubeId": "5Uv2ane3IRw",
            "title": "Scaffold Widget",
            "slug": "scaffold-widget",
            "level": 1,
            "duration": 1,
            "rank": 2,
            "createdAt": {
                "date": "2021-12-07 18:57:49.000000",
                "timezone_type": 3,
                "timezone": "Europe/Paris"
            },
            "technologyIds": "59",
            "currentExternalViews": 74,
            "oldExternalViews": 74,
            "currentInternalViews": 167,
            "oldInternalViews": 167,
            "likeCount": 3,
            "playlistId": 9,
            "playlistTitle": "Flutter Widgets",
            "score": 33.23076923076923
        }
    ]
      `)
     });
       
  

  function storeByKeyValue(key,value) {
      client.SETEX(key,EXPIRATION_VALUE, value);
  }
  async function getByKey(key) {
        return client.get(key);
  
  }
  

app.listen(3000)
