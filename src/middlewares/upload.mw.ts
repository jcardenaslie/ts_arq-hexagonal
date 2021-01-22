import multer from "multer";
import multer_s3 from "multer-s3"
import aws from "aws-sdk"
import yenv from "yenv"

const env = yenv()

const s3 = new aws.S3({
  accessKeyId: "AKIA3CMQWG7JOZGGCBGU",
  secretAccessKey:"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"
})

export class Upload {
  static s3(fieldName: string, ){
    return multer({
      storage: multer_s3({
        s3,
        bucket: env.AWS.S3.BUCKET_NAME,
        acl: "public-read",
        metadata: function(req, file, cb){
          cb(null, {fieldName: file.fieldname})
        }
      })
    }).single(fieldName)
  }
}