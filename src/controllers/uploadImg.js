import path from "path";
import { google } from "googleapis";
import  stream  from "stream";
import dotenv from "dotenv"

dotenv.config();

export const getPrueba = async (req, res)=> {
  return res.status(200).send("Root de /upload");
}


export const postImage = async (req, res)=>{
  const data = await uploadFile(req.files);

  if (data)
     return  res.status(200).send({status: true, data:data});
  else
     return  res.status(200).send({status:false, data:{}})

}



const uploadFile = async (fileObject) => {
  const folderId = `${process.env.IdFolder}`;
  const bufferStream = new  stream.PassThrough();
  bufferStream.end(fileObject.file.data);
  const drive = await getDriveService();
  const { data } = await drive.files.create({
    resource: {  
      name: fileObject.file.name,
      parents: [folderId],
    },
    media: {
      mimeType: fileObject.file.mimeType,
      body: bufferStream,
    },
    fields: "id,name,webViewLink",
  });
  return data ? data : null;
};


const getDriveService = async () => {
  const KEYFILEPATH = path.join(
    __dirname,
    "apitienda-420621-98b965a57092.json"
  );
  const SCOPES = ["https://www.googleapis.com/auth/drive"];

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  const authClient = await auth.getClient();
  const driveService = google.drive({ version: "v3", auth: authClient });
  return driveService;
};

