import { Type } from 'class-transformer'
import { Model } from '@gopowerteam/http-request'


export class COSTempSecretResponse extends Model {
  public expiration : string
  public expiredTime : string
  public requestId : string
  public sessionToken : string
  public startTime : string
  public tmpSecretId : string
  public tmpSecretKey : string
}

export class COSUploadUrlResponse extends Model {
  public url : string
}
