const config = require('./config');
const { MongoClient, ServerApiVersion, GridFSBucket } = require('mongodb');
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
            const cursor = imageBucket.find({files_id:results[i].imgsrc});
            for await (const doc of cursor) {
                send_data[i].imgsrc = doc.data;
            }
        }
        res.send(send_data);
    })
})

router.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file.id)
    const datas = {
        imgsrc: req.file.id,
        points: []
    }

    const req_datas = JSON.parse(req.body.alldata)
    for(const key in req_datas) {
        datas.points.push({
            xy: key.split(','),
            checkedSeasons: req_datas[key].checkedSeasons,
            radioCategory: req_datas[key].radioCategory,
            hashtags: req_datas[key].hashtags,
            link: req_datas[key].link
        })
    }

    console.log(datas)
    
    const collection = db.collection("closet_data");
    collection.insertOne(datas, function (err, results) {
        if (err) {
          console.log(err)
          res.send('')
          return
        }
    })

    res.status(200)
      .send("File uploaded successfully");
});

module.exports = router;


/* 여러개 insert
db.closet_data.insertMany([
    {
        imgsrc:"https://images.unsplash.com/photo-1602832339346-f7501f06e09a",
        points: [
            {
                "xy":["250px","260px"],
                "checkedSeasons":["봄","여름"],
                "radioCategory":"상의",
                "hashtags":["#white","#편하게"],
                "link":"www.naver.com"
            }
        ]
    },
])

db.closet_data.find({"points":{"$elemMatch":{"radioCategory":"신발"}}})*/