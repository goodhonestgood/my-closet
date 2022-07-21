const config = require('./config');
const { MongoClient, ServerApiVersion, GridFSBucket, ObjectId } = require('mongodb');
const router = require('express').Router();
const multer =require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

const uri = config.db_url;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  if (err != null) {
      console.log(err)
      return
  }
  console.log("connected to mongodb")
});

const db = client.db('clothes');
const bucket = new GridFSBucket(db, {bucketName:'imageBucket'});

const storage = new GridFsStorage({
    db: db,
    url: uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'imageBucket',
            };
            resolve(fileInfo);
        });
    }
});
  
const upload = multer({
    storage
});

router.post('/', (req,res)=>{
    let query = req.body.radioCategory == "모두" ? {} : req.body;
    console.log(query);
    
    const collection = db.collection("closet_data");
    collection.find({"points":{"$elemMatch":query}}).toArray(async (err, results) => {
        if(err) {
            console.log(err);
            res.send([]);
            return;
        }
        let imageBucket = db.collection("imageBucket.chunks");
        let send_data = results;
        for(let i = 0; i < results.length; i++) {
            const cursor = imageBucket.find({files_id:results[i].files_id});
            for await (const doc of cursor) {
                send_data[i].imgsrc = doc.data;
            }
        }
        res.send(send_data);
    })
})

router.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file.id);
    const datas = {
        files_id: req.file.id,
        points: [],
        imgSize: req.body.imgSize
    };

    const req_datas = JSON.parse(req.body.alldata);
    for(const key in req_datas) {
        datas.points.push({
            xy: key.split(','),
            checkedSeasons: req_datas[key].checkedSeasons,
            radioCategory: req_datas[key].radioCategory,
            hashtags: req_datas[key].hashtags,
            link: req_datas[key].link
        });
    };

    console.log(datas);
    
    const collection = db.collection("closet_data");
    collection.insertOne(datas, (err, results) => {
        if (err) {
          console.log(err);
          res.send('');
          return;
        };
    });

    res.status(200)
      .send("File uploaded successfully");
});

router.post('/delete', (req,res) => {
    var objId = req.body.files_id;
    bucket.delete(ObjectId(objId), (err) => {
        if(err) {
            console.log(err);
            res.send('');
            return;
        }
    });
    const collection = db.collection("closet_data");
    collection.deleteOne({"files_id": ObjectId(objId)},(err) => {
        if(err) {
            console.log(err);
            res.send('');
            return;
        }
    })

    res.status(200)
      .send("Deleted successfully");
});
module.exports = router;