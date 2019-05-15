const aws = require("aws-sdk");
// const Hashids = require("hashids");
require("dotenv").config();
aws.config.update({
  region: "us-west-2", // Put your aws region here
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

const S3_BUCKET = process.env.S3_BUCKET;
// Now lets export this function so we can call it from somewhere else
exports.sign_s3 = (req, res) => {
  const s3 = new aws.S3(); // Create a new instance of S3
  let fileName = req.body.fileName;
  const fileType = req.body.fileType;

  // Figure out a unique filename
  var random = Math.floor(Math.random() * 900000000000000000);

  fileName = `${fileName}_${random}.${fileType}`;

  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 50,
    ContentType: fileType,
    ACL: "public-read"
  };
  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.json({ data: { returnData } });
  });
};
