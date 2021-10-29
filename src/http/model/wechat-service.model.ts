import { Type } from 'class-transformer'
import { Model } from '@gopowerteam/http-request'


export class Attr extends Model {
  public name : string
  public textValue : string
  public type : number
  public webTitle : string
  public webUrl : string
}

export class Behavior extends Model {
  public avgReplyTime : number
  public chatCnt : number
  public messageCnt : number
  public negativeFeedbackCnt : number
  public newApplyCnt : number
  public newContactCnt : number
  public replyPercentage : number
  public statTime : number
}

export class Conclusion extends Model {
  public imgMediaId : string
  public imgPicUrl : string
  public linkDesc : string
  public linkPicUrl : string
  public linkTitle : string
  public linkUrl : string
  public miniProgramAppId : string
  public miniProgramPage : string
  public miniProgramPicMediaId : string
  public miniProgramTitle : string
  public textContent : string
}

export class ContactWay extends Model {
  public chatExpiresIn : number
  @Type(() => Conclusion)
  public conclusions : Conclusion
  public configId : string
  public expiresIn : number
  public isTemp : boolean
  public parties : string[]
  public qrCode : string
  public remark : string
  public scene : string
  public skipVerify : boolean
  public state : string
  public style : number
  public type : string
  public unionId : string
  public users : string[]
}

export class Department extends Model {
  /**
   * 删除标志
   */
  public deleteFlag : boolean
  /**
   * 删除时间
   */
  public deleteTime : string
  /**
   * 成员名称
   */
  public enName : string
  public id : number
  /**
   * 成员名称
   */
  public name : string
  /**
   * 成员名称
   */
  public order : number
  /**
   * 成员名称
   */
  public parentId : number
}

export class Employee extends Model {
  public address : string
  public alias : string
  public avatar : string
  public avatarMediaId : string
  /**
   * 联系我的配置ID
   */
  public contactWayConfigId : string
  /**
   * 联系我二维码的配置ID
   */
  public contactWayQRCodeConfigId : string
  /**
   * 删除标志
   */
  public deleteFlag : boolean
  /**
   * 删除时间
   */
  public deleteTime : string
  public departIds : number[]
  public email : string
  public enable : number
  public englishName : string
  @Type(() => Attr)
  public extAttrs : Attr[]
  @Type(() => ExternalAttribute)
  public externalAttrs : ExternalAttribute[]
  public externalCorpName : string
  public externalPosition : string
  public gender : string
  public hideMobile : number
  public jobNumber : string
  public mainDepartment : string
  public mobile : string
  public name : string
  public orders : number[]
  public position : string
  public positions : string[]
  public qrCode : string
  public status : number
  public telephone : string
  public thumbAvatar : string
  public toInvite : boolean
  public userId : string
}

export class EmployeeLoginResponse extends Model {
  @Type(() => EmployeeModel)
  public employee : EmployeeModel
  /**
   * 用户token
   */
  public token : string
}

export class EmployeeModel extends Model {
  public avatar : string
  public departIds : number[]
  public deviceId : string
  public expiresIn : string
  public jobNumber : string
  public mainDepartment : string
  public mobile : string
  public name : string
  public openId : string
  public qrCode : string
  public tenant : string
  public thumbAvatar : string
  public userId : string
  public userTicket : string
}

export class ExternalAttribute extends Model {
  @Type(() => MiniProgram)
  public miniProgram : MiniProgram
  public name : string
  @Type(() => Text)
  public text : Text
  public type : number
  @Type(() => Web)
  public web : Web
}

export class ExternalContact extends Model {
  public avatar : string
  public corpFullName : string
  public corpName : string
  @Type(() => ExternalProfile)
  public externalProfile : ExternalProfile
  public externalUserId : string
  public gender : number
  public name : string
  public position : string
  public type : number
  public unionId : string
}

export class ExternalProfile extends Model {
  @Type(() => ExternalAttribute)
  public externalAttrs : ExternalAttribute[]
}

export class File extends Model {
  public absolute : boolean
  @Type(() => File)
  public absoluteFile : File
  public absolutePath : string
  @Type(() => File)
  public canonicalFile : File
  public canonicalPath : string
  public directory : boolean
  public file : boolean
  public freeSpace : number
  public hidden : boolean
  public name : string
  public parent : string
  @Type(() => File)
  public parentFile : File
  public path : string
  public totalSpace : number
  public usableSpace : number
}

export class FollowedUser extends Model {
  public addWay : string
  public createTime : number
  public description : string
  public operatorUserId : string
  public remark : string
  public remarkCompany : string
  public remarkCorpName : string
  public remarkMobiles : string[]
  public state : string
  public tagIds : string[]
  @Type(() => Tag)
  public tags : Tag[]
  public userId : string
}

export class MiniProgram extends Model {
  public appid : string
  public pagePath : string
  public title : string
}

export class MpnewsArticle extends Model {
  public author : string
  public content : string
  public contentSourceUrl : string
  public digest : string
  public showCoverPic : string
  public thumbMediaId : string
  public title : string
}

export class NewArticle extends Model {
  public btnText : string
  public description : string
  public picUrl : string
  public title : string
  public url : string
}

export class Parties extends Model {
  public partyIds : number[]
}

export class QueryEmployeeByIdsRequest extends Model {
  public ids : string[]
}

export class Tag extends Model {
  public createTime : number
  public deleted : boolean
  public groupName : string
  public id : string
  public name : string
  public order : number
  public tagId : string
  public tagName : string
  public type : number
}

export class TagGroup extends Model {
  public createTime : number
  public deleted : boolean
  public groupId : string
  public groupName : string
  public order : number
  @Type(() => Tag)
  public tag : Tag[]
}

export class Tags extends Model {
  public tagIds : number[]
}

export class TaskCardButton extends Model {
  public bold : boolean
  public color : string
  public key : string
  public name : string
  public replaceName : string
}

export class Text extends Model {
  public value : string
}

export class User extends Model {
  public userId : string
}

export class Users extends Model {
  @Type(() => User)
  public users : User[]
}

export class Web extends Model {
  public title : string
  public url : string
}

export class WxCpAgent extends Model {
  public agentId : number
  @Type(() => Parties)
  public allowParties : Parties
  @Type(() => Tags)
  public allowTags : Tags
  @Type(() => Users)
  public allowUserInfos : Users
  public close : number
  public description : string
  public errCode : number
  public errMsg : string
  public homeUrl : string
  public isReportEnter : number
  public logoMediaId : string
  public name : string
  public redirectDomain : string
  public reportLocationFlag : number
  public squareLogoUrl : string
}

export class WxCpContactWayInfo extends Model {
  @Type(() => ContactWay)
  public contactWay : ContactWay
}

export class WxCpDepart extends Model {
  public enName : string
  public id : number
  public name : string
  public order : number
  public parentId : number
}

export class WxCpExternalContactInfo extends Model {
  @Type(() => ExternalContact)
  public externalContact : ExternalContact
  @Type(() => FollowedUser)
  public followedUsers : FollowedUser[]
}

export class WxCpMessage extends Model {
  public agentId : number
  public appId : string
  @Type(() => NewArticle)
  public articles : NewArticle[]
  public btnTxt : string
  public content : string
  public contentItems : object
  public description : string
  public duplicateCheckInterval : number
  public emphasisFirstItem : boolean
  public enableDuplicateCheck : boolean
  public enableIdTrans : boolean
  public hqMusicUrl : string
  public mediaId : string
  @Type(() => MpnewsArticle)
  public mpnewsArticles : MpnewsArticle[]
  public msgType : string
  public musicUrl : string
  public page : string
  public safe : string
  @Type(() => TaskCardButton)
  public taskButtons : TaskCardButton[]
  public taskId : string
  public thumbMediaId : string
  public title : string
  public toParty : string
  public toTag : string
  public toUser : string
  public url : string
}

export class WxCpTag extends Model {
  public id : string
  public name : string
}

export class WxCpTagGetResult extends Model {
  public errcode : number
  public errmsg : string
  public partylist : number[]
  public tagname : string
  @Type(() => WxCpUser)
  public userlist : WxCpUser[]
}

export class WxCpUser extends Model {
  public address : string
  public alias : string
  public avatar : string
  public avatarMediaId : string
  public departIds : number[]
  public email : string
  public enable : number
  public englishName : string
  @Type(() => Attr)
  public extAttrs : Attr[]
  @Type(() => ExternalAttribute)
  public externalAttrs : ExternalAttribute[]
  public externalCorpName : string
  public externalPosition : string
  public gender : string
  public hideMobile : number
  public isLeader : number
  public isLeaderInDept : number[]
  public mainDepartment : string
  public mobile : string
  public name : string
  public newUserId : string
  public openUserId : string
  public orders : number[]
  public position : string
  public positions : string[]
  public qrCode : string
  public status : number
  public telephone : string
  public thumbAvatar : string
  public toInvite : boolean
  public userId : string
}

export class WxCpUserExternalTagGroupList extends Model {
  public errcode : number
  public errmsg : string
  @Type(() => TagGroup)
  public tagGroupList : TagGroup[]
}

export class WxCpUserExternalUserBehaviorStatistic extends Model {
  @Type(() => Behavior)
  public behaviorList : Behavior[]
  public errcode : number
  public errmsg : string
}

export class WxJsapiSignature extends Model {
  public appId : string
  public nonceStr : string
  public signature : string
  public timestamp : number
  public url : string
}
