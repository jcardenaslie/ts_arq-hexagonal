import multer from 'multer';
import multer_s3 from 'multer-s3';
import aws from 'aws-sdk';
import yenv from 'yenv';
import { IError } from '../helpers/errors.helper';

const env = yenv();

const s3 = new aws.S3({
	accessKeyId: 'AKIA3CMQWG7JOZGGCBGU',
	secretAccessKey: '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',
});

aws.config.update({ region: 'us-east-1' });

export class Upload {
	static s3(fieldName: string) {
		return multer({
			storage: multer_s3({
				s3,
				bucket: env.AWS.S3.BUCKET_NAME,
				acl: 'public-read',
				metadata(req, file, cb) {
					cb(null, { fieldName: file.fieldname });
				},
				key(req: any, file, cb) {
					const partsFile = file.originalname.split('.');

					if (!file.mimetype.startsWith('image/')) {
						const error: IError = new Error('File is not an image');
						error.status = 500;
						return cb(error);
					}

					if (partsFile.length === 1) {
						const error: IError = new Error('Image without extension');
						error.status = 500;
						return cb(error);
					}

					const extension = partsFile[partsFile.length - 1];
					const name = Date.now().toString();
					const newFileName = name + '.' + extension;

					req.body.photo = newFileName;

					cb(null, newFileName);
				},
			}),
		}).single(fieldName);
	}
}
